 import Link from "next/link";
 import { FaGithub } from "react-icons/fa";

    const Footer = () => {

    return (
        <footer  className='absolute bottom-0 w-full' >
            <div className="bottom-details w-full py-2 px-4 bg-blue-100">
                <div className="bottom_text m-auto flex-between text-neutral-700">
                    <span className="copyright_text opacity-80  hover:opacity-100 ">Copyright © 2024 by WebWizards
                    <a className='opacity-90  hover:underline px-4 hover:opacity-100'  href="/">StudySphere</a>
                    All rights reserved
                    </span>
                    <span className=" opacity-80  hover:opacity-100 ">
                        <Link className='opacity-80  hover:underline px-4 hover:opacity-100'  href="https://github.com/WebWizards-Git/studysphere"><FaGithub className="inline mb-1"/> Github</Link>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
