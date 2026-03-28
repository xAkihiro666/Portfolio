import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'

function Socials() {
  const socials = [
    { label: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/j.vincent777' },
    { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/my.sky666' },
    { label: 'GitHub', icon: FaGithub, href: 'https://github.com/xAkihiro666/' },
    { label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/jude-vincent-lutao-a4b7563aa/' },
    { label: 'Discord', icon: FaDiscord, href: 'https://discord.com/users/801489372322332732' },
  ]

  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-stone-400 sm:mt-12 sm:gap-x-8">
      {socials.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target={href !== '#' ? '_blank' : undefined}
          rel={href !== '#' ? 'noreferrer' : undefined}
          className="group flex items-center text-stone-400 transition-colors duration-300 hover:text-stone-50"
          aria-label={label}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-stone-300 transition-colors duration-200 group-hover:border-white/25 group-hover:text-stone-50">
            <Icon className="text-[0.95rem]" aria-hidden="true" />
          </span>
          <span
            className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-[0.82rem] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 ease-out group-hover:max-w-32 group-hover:pl-3 group-hover:opacity-100"
          >
            {label}
          </span>
        </a>
      ))}
    </div>
  )
}

export default Socials
