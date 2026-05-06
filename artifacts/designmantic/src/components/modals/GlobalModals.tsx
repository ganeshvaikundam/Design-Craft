import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import VideoModal from "./VideoModal";
import LogoEditorModal from "./LogoEditorModal";
import CheckoutModal from "./CheckoutModal";
import SuccessModal from "./SuccessModal";
import TemplatePreviewModal from "./TemplatePreviewModal";

export function GlobalModals() {
  return (
    <>
      <LoginModal />
      <SignUpModal />
      <VideoModal />
      <LogoEditorModal />
      <CheckoutModal />
      <SuccessModal />
      <TemplatePreviewModal />
    </>
  );
}