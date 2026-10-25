import Image from "next/image";

type ProjectVisualProps = {
  projectId: string;
};

type ProjectScreenshotProps = {
  src: string;
  variant: "lenders" | "agency" | "pss" | "merchant" | "starline";
};

function ProjectScreenshot({ src, variant }: ProjectScreenshotProps) {
  return (
    <div className={`eg-project-screenshot eg-project-screenshot--${variant}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
      />
    </div>
  );
}

function LendersVisual() {
  return (
    <ProjectScreenshot
      src="/images/mycreditscore-credit-score.png"
      variant="lenders"
    />
  );
}

function AgencyVisual() {
  return (
    <ProjectScreenshot
      src="/images/mycreditscore-credit-report.png"
      variant="agency"
    />
  );
}

function PaySmallSmallVisual() {
  return (
    <ProjectScreenshot
      src="/images/paysmallsmall-login.png"
      variant="pss"
    />
  );
}

function InvoicingVisual() {
  return (
    <ProjectScreenshot
      src="/images/merchant-invoicing-clifton-homes.png"
      variant="merchant"
    />
  );
}

function StarlineVisual() {
  return (
    <ProjectScreenshot
      src="/images/starline-hr-homepage.png"
      variant="starline"
    />
  );
}

export function ProjectVisual({ projectId }: ProjectVisualProps) {
  return (
    <div className="eg-project-visual" aria-hidden="true">
      {projectId === "lenders-portal" && <LendersVisual />}
      {projectId === "agency-backoffice" && <AgencyVisual />}
      {projectId === "paysmallsmall" && <PaySmallSmallVisual />}
      {projectId === "merchant-invoicing" && <InvoicingVisual />}
      {projectId === "starline-hr" && <StarlineVisual />}
    </div>
  );
}

export function ProfileVisual() {
  return (
    <div className="eg-profile-visual" aria-hidden="true">
      <div className="eg-profile-orbit" />
      <span className="eg-profile-kicker">Accra · Ghana</span>
      <strong>EG</strong>
      <div className="eg-profile-meta">
        <span>Software Engineer</span>
        <span>5.6037° N · 0.1870° W</span>
      </div>
      <div className="eg-profile-line"><i /><span>Product</span><i /><span>Systems</span><i /><span>Trust</span></div>
    </div>
  );
}
