function InfoSvg({className})
{
    return (
        <svg className={className} viewBox="2 2 20 20">
            <path fill="none" d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" stroke="var(--link-color)" strokeWidth="1.5"/>
            <path fill="var(--link-color)" d="M12 15.5V11.5" stroke="var(--link-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="9" r="0.5" stroke="var(--link-color)" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default InfoSvg