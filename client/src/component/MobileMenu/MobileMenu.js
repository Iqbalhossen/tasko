"use client";
import { BookCheck, LoaderPinwheel, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
export default function MobileMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Menu className="mobile-menu" onClick={handleShow} />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mobile-menu-section">
            <Link href="">
              <BookCheck size={30} /> Task Lists
            </Link>
            <hr />
            <Link href="">
              <LoaderPinwheel size={30} /> Spin
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
