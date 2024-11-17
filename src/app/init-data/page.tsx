'use client';

import { useMemo, useState } from 'react';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import { List, Placeholder, Section, Button } from '@telegram-apps/telegram-ui'; // Added Button here
import { Link } from '@/components/Link/Link';
import { Cell, Image } from '@telegram-apps/telegram-ui'; 

import tonSvg from '../_assets/ton.svg'; // Ensure this path is correct

import { DisplayData, type DisplayDataRow } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: 'Name', value: `${user.firstName} ${user.lastName}` },
    { title: 'Username', value: user.username },
    { title: 'Profile Photo', value: user.photoUrl ? <Image src={user.photoUrl} /> : 'No photo' },
    { title: 'Language', value: user.languageCode },
    { title: 'Bot Status', value: user.isBot ? 'Yes' : 'No' },
    { title: 'Premium User', value: user.isPremium ? 'Yes' : 'No' },
  ];
}

export default function InitDataPage() {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [points, setPoints] = useState<number>(0);  // Track points (initialized to 0)

  // Handle file upload (CV)
  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setCvFile(file);
      // Add 100 points when the user uploads a CV
      setPoints((prevPoints) => prevPoints + 100);
      
      // Optional: You can also upload the CV to a server or cloud storage here
    }
  };

  // Prepare data to be displayed on the page
  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    // Check if initDataState or initDataRaw are undefined or null
    if (!initDataState || !initDataRaw) {
      return undefined; // or return empty array if preferred
    }
    const {
      authDate,
    } = initDataState;
    return [
      { title: 'Points', value: points },  // Display points prominently
      { title: 'Level', value: `Level ${(points / 100).toFixed(0)}` },  // Display level based on points
      { title: 'CV Upload', value: (
        <div>
          <p><strong>Upload your CV to start applying for jobs and earn 100 points!</strong></p>
          <input 
            type="file" 
            accept=".pdf, .doc, .docx, .txt" 
            onChange={handleCvUpload} 
            style={{ marginBottom: '10px' }}
          />
          {cvFile ? (
            <p>Selected CV: {cvFile.name}</p>
          ) : (
            <p>No CV selected</p>
          )}
          <p>Points Earned: {points}</p> {/* Display points */}
        </div>
      )},
      { title: 'Jobs Approved', value: authDate.toLocaleString() },
      { title: 'TON Wallet', value: (
        <Link href="/ton-connect">
          <Cell
            before={
              <Image
                src={tonSvg.src}
                style={{ backgroundColor: '#007AFF' }}
              />
            }
            subtitle="Connect your TON wallet"
          >
            TON Connect
          </Cell>
        </Link>
      ) },
    ];
  }, [initDataState, initDataRaw, cvFile, points]);  // Re-run this when points or cvFile change

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);

  if (!initDataRows) {
    return (
      <Page>
        <Placeholder
          header="Oops"
          description="Application was launched with missing init data"
        >
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: 'block', width: '144px', height: '144px' }}
          />
        </Placeholder>
      </Page>
    );
  }

  return (
    <Page>
      <List>
        <DisplayData header={'User Profile'} rows={initDataRows} />
        {userRows && <DisplayData header={'User'} rows={userRows} />}
        
        {/* Clearer Call to Action */}
        <Section header="Get Started with Your Profile">
          <p>Upload your CV to unlock more features, earn points, and start applying for jobs!</p>
        </Section>

        {/* Job Application Section */}
        <Section header="Job Applications">
          <p>Start applying for jobs now! Complete your profile to get job recommendations.</p>
          <Link href="/launch-params">
            <Button>View Jobs</Button>
          </Link>
        </Section>

        {/* Social media links section */}
        <Section footer="Connect with us">
          <Link href="https://facebook.com/Nexhire">
            <Cell>Facebook</Cell>
          </Link>
          <Link href="https://twitter.com/Nexhire">
            <Cell>Twitter</Cell>
          </Link>
          <Link href="https://linkedin.com/company/Nexhire">
            <Cell>LinkedIn</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
}
