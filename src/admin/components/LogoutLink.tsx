export const LogoutLink = () => {
  return (
    <a
      href="/logout"
      className="nav__link"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--base)',
        padding: 'calc(var(--base) * 0.5) calc(var(--base) * 1.5)',
        color: 'var(--theme-elevation-800)',
        textDecoration: 'none',
        fontSize: 'var(--font-size-base)',
        borderRadius: 'var(--style-radius-s)',
      }}
    >
      Log out
    </a>
  )
}
