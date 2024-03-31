
import { WhatsappShareButton } from "react-share"
import { FaShare } from "react-icons/fa6";
function WhatsappButton({url,msg}) {
  return (
     <WhatsappShareButton url={url} title={msg}>
            <FaShare />
     </WhatsappShareButton>
  )
}

export default WhatsappButton