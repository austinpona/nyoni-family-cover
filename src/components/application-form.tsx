"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle, MessageCircle, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { z } from "zod";
import { packages, whatsappUrl } from "@/lib/site-data";
import { SectionHeading } from "./section-heading";

const CONTACT_METHOD = { WHATSAPP: "WhatsApp", PHONE: "Phone call" } as const;
const OPTION = { TWO: "2", THREE: "3", FOUR: "4", FIVE: "5", EIGHT: "8" } as const;
const PROVINCES = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"] as const;

const additionalMemberSchema = z.object({
  fullName: z.string(),
  idNumber: z.string(),
  relationship: z.string(),
  dateOfBirth: z.string(),
});

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  idNumber: z.string().trim().regex(/^\d{13}$/, "Enter a 13-digit South African ID number."),
  phone: z.string().trim().regex(/^(?:\+27|27|0)[6-8]\d{8}$/, "Enter a valid South African mobile number."),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.")]),
  address: z.string().trim().min(5, "Enter your residential address."),
  area: z.string().trim().min(2, "Enter your town or city."),
  province: z.enum(PROVINCES, { message: "Select your province." }),
  joiningDate: z.string().min(1, "Select a joining date."),
  paymentDay: z.number({ message: "Enter your preferred payment day." }).int().min(1, "Choose a day from 1 to 31.").max(31, "Choose a day from 1 to 31."),
  packageOption: z.enum([OPTION.TWO, OPTION.THREE, OPTION.FOUR, OPTION.FIVE, OPTION.EIGHT], { message: "Select a membership option." }),
  memberCount: z.number({ message: "Enter the number of members." }).int().min(2).max(8),
  additionalMembers: z.array(additionalMemberSchema),
  addOns: z.array(z.string()),
  contactMethod: z.enum([CONTACT_METHOD.WHATSAPP, CONTACT_METHOD.PHONE]),
  consent: z.boolean().refine(Boolean, "Consent is required to continue."),
  termsConfirmed: z.boolean().refine(Boolean, "Please confirm the declaration."),
  website: z.string().max(0),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

function FieldError({ message }: { message?: string }) {
  return message ? <p role="alert" className="mt-1 text-xs text-amber-700">{message}</p> : null;
}

const inputClass = "mt-2 w-full rounded-md border border-charcoal/20 bg-white px-4 py-3.5 text-sm text-charcoal shadow-sm placeholder:text-muted/50 focus-visible:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const emptyMembers = Array.from({ length: 7 }, () => ({ fullName: "", idNumber: "", relationship: "", dateOfBirth: "" }));

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "preparing" | "ready" | "error">("idle");
  const [step, setStep] = useState(0);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const { register, handleSubmit, setValue, control, trigger, getValues, formState: { errors } } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { fullName: "", idNumber: "", phone: "", email: "", address: "", area: "", joiningDate: "", addOns: [], additionalMembers: emptyMembers, contactMethod: CONTACT_METHOD.WHATSAPP, consent: false, termsConfirmed: false, website: "" },
  });
  const memberCount = useWatch({ control, name: "memberCount" }) || 2;
  const steps = ["Your details", "Choose cover", "Family members", "Review & send"];

  useEffect(() => {
    const option = new URLSearchParams(window.location.search).get("option");
    if (Object.values(OPTION).includes(option as (typeof OPTION)[keyof typeof OPTION])) {
      setValue("packageOption", option as ApplicationValues["packageOption"]);
      setValue("memberCount", Number(option));
    }
  }, [setValue]);

  const moveTo = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => stepHeading.current?.focus());
  };

  const nextStep = async () => {
    let fields: FieldPath<ApplicationValues>[] = [];
    if (step === 0) fields = ["fullName", "idNumber", "phone", "email", "province", "area", "address", "joiningDate", "paymentDay"];
    if (step === 1) fields = ["packageOption", "memberCount"];
    if (await trigger(fields, { shouldFocus: true })) moveTo(step + 1);
  };

  const onSubmit = (values: ApplicationValues) => {
    setStatus("preparing");
    try {
      const selected = packages.find((item) => String(item.members) === values.packageOption);
      const members = values.additionalMembers.slice(0, values.memberCount - 1).flatMap((member, index) => {
        const hasDetails = member.fullName || member.idNumber || member.relationship || member.dateOfBirth;
        return hasDetails ? [
          `Member ${index + 2}: ${member.fullName || "To be provided"}`,
          `ID: ${member.idNumber || "To be provided"} | Relationship: ${member.relationship || "To be provided"} | Date of birth: ${member.dateOfBirth || "To be provided"}`,
        ] : [`Member ${index + 2}: Details to be provided during follow-up`];
      });
      const message = [
        "*NYONI FAMILY COVER — MEMBERSHIP APPLICATION*", "",
        "*Main member details*",
        `Full name: ${values.fullName}`,
        `ID number: ${values.idNumber}`,
        `Mobile number: ${values.phone}`,
        `Email: ${values.email || "Not provided"}`,
        `Residential address: ${values.address}`,
        `Town / city: ${values.area}`,
        `Province: ${values.province}`,
        `Joining date: ${values.joiningDate}`,
        `Preferred payment day: ${values.paymentDay}`,
        "", "*Membership plan*",
        `${values.packageOption} members — R${selected?.price ?? "-"} per month`,
        `Add-ons: ${values.addOns.length ? values.addOns.join(", ") : "None"}`,
        "", "*Additional members*", ...members,
        "", `Preferred contact: ${values.contactMethod}`,
        "Declaration: I confirm that these details are correct and agree to the monthly payment terms, waiting period and conditions.",
      ].join("\n");
      const popup = window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
      setStatus(popup ? "ready" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="join" className="section-pad bg-soft-cream">
      <div className="container-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <div><SectionHeading eyebrow="Membership form" title="Apply on WhatsApp" intro="Fill in the application below. We’ll put all your details into a WhatsApp message for you to review and send to Nyoni." /><div className="mt-8 border border-gold/25 bg-cream p-5"><p className="text-sm leading-6 text-muted"><strong className="text-charcoal">Before you continue:</strong> your completed details, including ID numbers and address, will be included in the WhatsApp message. Please check everything carefully before sending.</p></div></div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass-light grid gap-x-5 gap-y-5 rounded-xl p-5 sm:grid-cols-2 sm:p-8">
          <div className="sm:col-span-2" aria-label={`Application progress: step ${step + 1} of ${steps.length}`}><div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider"><span>Step {step + 1} of {steps.length}</span><span className="text-gold">{steps[step]}</span></div><div className="h-1.5 overflow-hidden bg-charcoal/10"><div className="h-full bg-gold transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div></div>
          <h3 ref={stepHeading} tabIndex={-1} className="sr-only sm:col-span-2">{steps[step]}</h3>
          <div className={step === 0 ? "contents" : "hidden"}>
          <div className="sm:col-span-2"><h3 className="text-lg font-bold">1. Main member details</h3></div>
          <div className="sm:col-span-2"><label htmlFor="fullName" className="text-sm font-semibold">Full name</label><input id="fullName" autoComplete="name" className={inputClass} placeholder="Your first and last name" aria-invalid={!!errors.fullName} {...register("fullName")} /><FieldError message={errors.fullName?.message} /></div>
          <div><label htmlFor="idNumber" className="text-sm font-semibold">SA ID number</label><input id="idNumber" inputMode="numeric" maxLength={13} className={inputClass} placeholder="13 digits" aria-invalid={!!errors.idNumber} {...register("idNumber")} /><FieldError message={errors.idNumber?.message} /></div>
          <div><label htmlFor="phone" className="text-sm font-semibold">Mobile number</label><input id="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="063 602 1868" aria-invalid={!!errors.phone} {...register("phone")} /><FieldError message={errors.phone?.message} /></div>
          <div><label htmlFor="email" className="text-sm font-semibold">Email <span className="font-normal text-muted">(optional)</span></label><input id="email" type="email" autoComplete="email" className={inputClass} placeholder="name@example.com" aria-invalid={!!errors.email} {...register("email")} /><FieldError message={errors.email?.message} /></div>
          <div><label htmlFor="province" className="text-sm font-semibold">Province</label><select id="province" className={inputClass} defaultValue="" aria-invalid={!!errors.province} {...register("province")}><option value="" disabled>Select your province</option>{PROVINCES.map((province) => <option key={province}>{province}</option>)}</select><FieldError message={errors.province?.message} /></div>
          <div><label htmlFor="area" className="text-sm font-semibold">Town / city</label><input id="area" autoComplete="address-level2" className={inputClass} placeholder="Your town or city" aria-invalid={!!errors.area} {...register("area")} /><FieldError message={errors.area?.message} /></div>
          <div><label htmlFor="address" className="text-sm font-semibold">Residential address</label><textarea id="address" autoComplete="street-address" rows={3} className={inputClass} placeholder="House number, street and suburb" aria-invalid={!!errors.address} {...register("address")} /><FieldError message={errors.address?.message} /></div>
          <div><label htmlFor="joiningDate" className="text-sm font-semibold">Joining date</label><input id="joiningDate" type="date" className={inputClass} aria-invalid={!!errors.joiningDate} {...register("joiningDate")} /><FieldError message={errors.joiningDate?.message} /></div>
          <div><label htmlFor="paymentDay" className="text-sm font-semibold">Preferred payment day (1–31)</label><input id="paymentDay" type="number" min={1} max={31} className={inputClass} placeholder="Example: 25" aria-invalid={!!errors.paymentDay} {...register("paymentDay", { valueAsNumber: true })} /><FieldError message={errors.paymentDay?.message} /></div>

          </div><div className={step === 1 ? "contents" : "hidden"}>
          <div className="mt-3 sm:col-span-2"><h3 className="text-lg font-bold">2. Choose a plan</h3><p className="mt-1 text-xs text-muted">The main member counts as one person.</p></div>
          <div className="sm:col-span-2"><label htmlFor="packageOption" className="text-sm font-semibold">Membership option</label><select id="packageOption" className={inputClass} defaultValue="" aria-invalid={!!errors.packageOption} {...register("packageOption", { onChange: (event) => setValue("memberCount", Number(event.target.value), { shouldValidate: true }) })}><option value="" disabled>Select an option</option>{packages.map((item) => <option key={item.members} value={item.members}>{item.members} members — R{item.price}/month</option>)}</select><FieldError message={errors.packageOption?.message} /></div>
          <input type="hidden" {...register("memberCount", { valueAsNumber: true })} />
          <fieldset className="sm:col-span-2"><legend className="text-sm font-semibold">Add-ons (optional)</legend><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-start gap-3 border border-charcoal/15 bg-white p-4"><input type="checkbox" value="On the Go — 20 loaves (+R70/month)" className="mt-1 accent-gold" {...register("addOns")} /><span><strong className="block text-sm">On the Go (+R70/month)</strong><span className="text-xs text-muted">20 loaves of bread per day</span></span></label><label className="flex cursor-pointer items-start gap-3 border border-charcoal/15 bg-white p-4"><input type="checkbox" value="Food Support (+R70/month)" className="mt-1 accent-gold" {...register("addOns")} /><span><strong className="block text-sm">Food Support (+R70/month)</strong><span className="text-xs text-muted">Food support package</span></span></label></div></fieldset>

          </div><div className={step === 2 ? "contents" : "hidden"}>
          <div className="mt-3 sm:col-span-2"><h3 className="flex items-center gap-2 text-lg font-bold"><Users size={20} aria-hidden="true" />3. Additional members <span className="font-normal text-muted">(optional)</span></h3><p className="mt-1 text-xs leading-5 text-muted">Add the people covered besides the main member. If you do not have their information now, leave these fields blank and Nyoni will follow up with you.</p></div>
          {Array.from({ length: Math.max(1, memberCount - 1) }, (_, index) => <fieldset key={index} className="grid gap-x-4 gap-y-4 border-t border-charcoal/15 pt-5 sm:col-span-2 sm:grid-cols-2"><legend className="pr-3 text-sm font-bold">Member {index + 2}</legend><div><label htmlFor={`member-${index}-name`} className="text-sm font-semibold">Full name</label><input id={`member-${index}-name`} className={inputClass} aria-invalid={!!errors.additionalMembers?.[index]?.fullName} {...register(`additionalMembers.${index}.fullName`)} /><FieldError message={errors.additionalMembers?.[index]?.fullName?.message} /></div><div><label htmlFor={`member-${index}-id`} className="text-sm font-semibold">ID number</label><input id={`member-${index}-id`} inputMode="numeric" maxLength={13} className={inputClass} aria-invalid={!!errors.additionalMembers?.[index]?.idNumber} {...register(`additionalMembers.${index}.idNumber`)} /><FieldError message={errors.additionalMembers?.[index]?.idNumber?.message} /></div><div><label htmlFor={`member-${index}-relationship`} className="text-sm font-semibold">Relationship</label><input id={`member-${index}-relationship`} className={inputClass} placeholder="Example: Spouse" aria-invalid={!!errors.additionalMembers?.[index]?.relationship} {...register(`additionalMembers.${index}.relationship`)} /><FieldError message={errors.additionalMembers?.[index]?.relationship?.message} /></div><div><label htmlFor={`member-${index}-dob`} className="text-sm font-semibold">Date of birth</label><input id={`member-${index}-dob`} type="date" className={inputClass} aria-invalid={!!errors.additionalMembers?.[index]?.dateOfBirth} {...register(`additionalMembers.${index}.dateOfBirth`)} /><FieldError message={errors.additionalMembers?.[index]?.dateOfBirth?.message} /></div></fieldset>)}

          </div><div className={step === 3 ? "contents" : "hidden"}>
          <div className="sm:col-span-2"><h3 className="text-lg font-bold">4. Review and confirm</h3><div className="mt-4 grid gap-3 bg-white p-5 text-sm sm:grid-cols-2"><p><span className="block text-xs uppercase tracking-wider text-muted">Main member</span><strong>{getValues("fullName")}</strong></p><p><span className="block text-xs uppercase tracking-wider text-muted">Plan</span><strong>{getValues("packageOption")} members</strong></p><p><span className="block text-xs uppercase tracking-wider text-muted">Location</span><strong>{getValues("area")}, {getValues("province")}</strong></p><p><span className="block text-xs uppercase tracking-wider text-muted">Additional members</span><strong>{memberCount - 1}</strong></p></div><p className="mt-3 text-xs leading-5 text-muted">Your application will open in WhatsApp for one final check before you send it.</p></div>
          <fieldset className="sm:col-span-2"><legend className="text-sm font-semibold">Preferred contact method</legend><div className="mt-3 flex gap-6">{Object.values(CONTACT_METHOD).map((method) => <label key={method} className="flex items-center gap-2 text-sm"><input type="radio" value={method} className="accent-gold" {...register("contactMethod")} />{method}</label>)}</div></fieldset>
          <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
          <div className="space-y-4 sm:col-span-2"><label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" className="mt-1 accent-gold" {...register("consent")} /><span>I consent to Nyoni receiving and processing the information I send through WhatsApp for this application.</span></label><FieldError message={errors.consent?.message} /><label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" className="mt-1 accent-gold" {...register("termsConfirmed")} /><span>I confirm that these details are correct and agree to the monthly payment terms, 6-month waiting period and important conditions.</span></label><FieldError message={errors.termsConfirmed?.message} /></div>
          <div className="sm:col-span-2"><button type="submit" disabled={status === "preparing"} className="focus-ring flex w-full items-center justify-center gap-3 bg-charcoal px-6 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-gold disabled:cursor-wait disabled:opacity-70">{status === "preparing" ? <LoaderCircle className="animate-spin" size={19} /> : <MessageCircle size={19} />} {status === "preparing" ? "Preparing…" : "Send application via WhatsApp"}</button>{status === "ready" && <p role="status" className="mt-3 flex items-center gap-2 text-sm text-muted"><CheckCircle2 size={17} className="text-gold" /> WhatsApp opened. Review the application and tap send.</p>}{status === "error" && <p role="alert" className="mt-3 text-sm text-amber-800">We could not open WhatsApp. Please allow pop-ups or contact Nyoni directly on 063 602 1868.</p>}<p className="mt-3 text-xs leading-5 text-muted">Your entries are not stored on this website. They are shared only when you send the prepared WhatsApp message.</p></div>
          </div>
          <div className="flex items-center gap-3 border-t border-charcoal/15 pt-5 sm:col-span-2">
            {step > 0 && <button type="button" onClick={() => moveTo(step - 1)} className="focus-ring inline-flex min-h-12 items-center gap-2 border border-charcoal/25 px-5 text-xs font-bold uppercase tracking-wider hover:border-gold hover:text-gold"><ArrowLeft size={16} />Back</button>}
            {step < 3 && <button type="button" onClick={nextStep} className="focus-ring ml-auto inline-flex min-h-12 items-center gap-2 bg-charcoal px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-gold">Continue<ArrowRight size={16} /></button>}
          </div>
        </form>
      </div>
    </section>
  );
}
