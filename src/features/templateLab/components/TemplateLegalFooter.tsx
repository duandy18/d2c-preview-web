import '../styles/templateLegalFooter.css'

export function TemplateLegalFooter() {
  return (
    <footer className="template-legal-footer">
      <div className="template-legal-footer-inner">
        <span>© 2026 Paw Home</span>
        <a
          href="https://beian.miit.gov.cn/"
          rel="noreferrer"
          target="_blank"
        >
          ICP备案号待填写
        </a>
        <a
          href="https://beian.mps.gov.cn/"
          rel="noreferrer"
          target="_blank"
        >
          公安备案号待填写
        </a>
      </div>
    </footer>
  )
}
