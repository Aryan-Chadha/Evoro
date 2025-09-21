
import { defineElement } from "@lordicon/element";

defineElement();
function Icons() {

    const socialIcons = [
        {
            name: 'Instagram',
            data: '/icons/insta_icon.json',
            url: 'https://www.instagram.com/evoro.studios?igsh=cmNwaDkyNTRnMWww',
            color: '#E4405F'
        },
        {
            name: 'LinkedIn',
            data: '/icons/linkedin_icon.json',
            url: 'https://www.linkedin.com/in/evoro-studios?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            color: '#0A66C2'
        }
    ];

    return (
        <div className="flex gap-6 ">
            {socialIcons.map((icon, index) => (
                <a
                    key={icon.name}
                    href={icon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-110"
                    title={icon.name}
                >
                   <lord-icon trigger="hover" src={icon.data}></lord-icon>
                </a>
            ))}
        </div>
    )
}

export default Icons
