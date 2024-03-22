
import { WhatsappShareButton } from "react-share"
import { IoShareSocialSharp } from "react-icons/io5";
function WhatsappButton({url,msg}) {
  return (
     <WhatsappShareButton url={url} title={msg}>
            <IoShareSocialSharp/>
     </WhatsappShareButton>
  )
}

export default WhatsappButton