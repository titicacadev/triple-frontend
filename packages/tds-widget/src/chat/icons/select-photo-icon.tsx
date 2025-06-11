export default function SelectPhotoIcon({ ...props }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_242_8844"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="22"
        height="22"
      >
        <rect x="2.5" y="2.5" width="21" height="21" rx="4" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_242_8844)">
        <rect x="2.5" y="2.5" width="21" height="21" rx="4" fill="#7E7E81" />
        <path
          d="M20.4262 14.9262L25.0899 19.5899C25.3525 19.8525 25.5 20.2086 25.5 20.5799V25.6C25.5 26.3732 24.8732 27 24.1 27H2.9001C2.1269 27 1.5001 26.3732 1.5001 25.6V17.5498C1.5001 17.1964 1.63373 16.8561 1.87418 16.5971L7.01143 11.0646C7.55138 10.4831 8.4662 10.4662 9.0273 11.0273L14.5738 16.5738C15.095 17.095 15.931 17.1229 16.4857 16.6375L18.5143 14.8625C19.069 14.3771 19.905 14.405 20.4262 14.9262Z"
          stroke="#F9FAFF"
          strokeWidth="1.96429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="8" r="2" fill="#F9FAFF" />
      </g>
    </svg>
  )
}
