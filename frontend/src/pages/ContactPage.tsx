import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

export function ContactPage() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message depuis le site — ${nom || 'Visiteur'}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${nom}\n${email}`,
    );
    window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="page page--inner contact-page">
      <header className="page-header">
        <h1 className="page-header__title">Contact</h1>
        <p className="page-header__lead">
          Une question, une suggestion ou envie de collaborer ? Écrivez-nous ou utilisez le
          formulaire ci-dessous.
        </p>
      </header>

      <div className="contact-grid">
        <section className="contact-card" aria-labelledby="contact-infos-title">
          <h2 id="contact-infos-title" className="contact-card__title">
            Coordonnées
          </h2>
          <ul className="contact-list">
            <li>
              <span className="contact-list__label">E-mail</span>
              <a href="mailto:contact@example.com">contact@example.com</a>
            </li>
            <li>
              <span className="contact-list__label">Horaires (indicatif)</span>
              <span>Lun. — ven. · 9h — 18h</span>
            </li>
            <li>
              <span className="contact-list__label">Réseaux</span>
              <span className="contact-list__social">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
                {' · '}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </span>
            </li>
          </ul>
          <p className="contact-card__note">
            Ce site est une démonstration : les adresses et horaires sont des exemples. Adaptez
            <code> contact@example.com </code>
            dans le code et la base selon votre projet.
          </p>
        </section>

        <section className="contact-card contact-card--form" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="contact-card__title">
            Envoyer un message
          </h2>
          {sent && (
            <p className="form-success" role="status">
              Si votre messagerie ne s’est pas ouverte, copiez votre texte et écrivez-nous à{' '}
              <a href="mailto:contact@example.com">contact@example.com</a>.
            </p>
          )}
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-field">
              <label htmlFor="contact-nom">Nom</label>
              <input
                id="contact-nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                autoComplete="name"
                placeholder="Votre nom"
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">E-mail</label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-msg">Message</label>
              <textarea
                id="contact-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder="Votre message…"
              />
            </div>
            <button type="submit" className="cta contact-form__submit">
              Ouvrir la messagerie
            </button>
            <p className="contact-form__hint">
              Le bouton ouvre votre application mail avec le message prérempli (mailto).
            </p>
          </form>
        </section>
      </div>

      <p className="contact-back">
        <Link to="/" className="back-link">
          ← Retour à l’accueil
        </Link>
      </p>
    </div>
  );
}
