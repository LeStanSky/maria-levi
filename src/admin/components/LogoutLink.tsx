export const LogoutLink = () => {
  return (
    <a
      href="/logout"
      style={{
        display: 'block',
        padding: 'calc(var(--base) * 0.5) calc(var(--base) * 1)',
        marginTop: 'calc(var(--base) * 0.25)',
        color: 'var(--theme-elevation-650)',
        textDecoration: 'none',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        lineHeight: 'inherit',
      }}
    >
      Log out
    </a>
  )
}
