"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className="custom-404">
        <div className="custom-404-bg-image">
            <img src="/images/Roadmap-Design.png" alt="" className="custom-404-Roadmap" />
          {/* <Image
            src="/images/Roadmap-Design.svg"
            alt="404 Page Not Found"
            fill
            sizes="(max-width: 448px)"
            className="Roadmap"
          /> */}
        </div>
        <div className="custom-404-card-area">
          <div className="custom-404-card shadow-sm">
            <Image
              src="./images/Frame.svg"
              alt="404 Page Not Found"
              width={400}
              height={300}
              className="img-fluid mx-auto d-block"
            />
            <button
              className="btn-custom-success mt-50 w-100"
              onClick={() => router.push("/")}
            >
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
