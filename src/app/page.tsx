'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';

import nexhireLogo from './_assets/nexhire-logo.png';


export default function Home() {
  return (
    <Page back={false}>
      {/* Nexhire logo at the top */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={nexhireLogo.src} alt="Nexhire Logo" style={{ width: '150px', height: 'auto' }} />
      </div>
      <List>
        <Section header="Welcome to Nexhire">
          <Cell subtitle="Choose how you'd like to log in and get started">
            Begin your journey with us.
          </Cell>
        </Section>
        <Section header="Login Options">
          <Link href="/init-data">
            <Cell subtitle="Explore job opportunities tailored for you">
              Log in as Job Seeker
            </Cell>
          </Link>
          <Link href="/launch-params">
            <Cell subtitle="Post job openings and find the right talent">
              Log in as Company
            </Cell>
          </Link>
        </Section>
        <Section header="Connect with Us">
          {/* Placeholder for social media links */}
          <Cell subtitle="Follow us on our social media platforms to stay updated.">
            {/* Add social media links here */}
            <Link href="https://facebook.com/nexhire" target="_blank">
              Facebook
            </Link>
            <Link href="https://twitter.com/nexhire" target="_blank">
              Twitter
            </Link>
            <Link href="https://linkedin.com/company/nexhire" target="_blank">
              LinkedIn
            </Link>
            <Link href="https://instagram.com/nexhire" target="_blank">
              Instagram
            </Link>
          </Cell>
        </Section>
      </List>
    </Page>
  );
}



































