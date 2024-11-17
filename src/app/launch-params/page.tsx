'use client';

import { useState, useEffect } from 'react';  // React hooks to manage job listing state
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

// Sample static job data (you can replace this with dynamic fetching)
const sampleJobListings = [
  {
    title: 'Software Engineer',
    company: 'Nexhire',
    location: 'Manila, Philippines',
    description: 'Join our team to build innovative solutions in the tech industry.',
    applyLink: '/apply/software-engineer',  // This could link to a job application page
  },
  {
    title: 'Product Manager',
    company: 'Nexhire',
    location: 'Remote',
    description: 'Lead product development from concept to execution.',
    applyLink: '/apply/product-manager',
  },
  {
    title: 'UX Designer',
    company: 'Nexhire',
    location: 'Cebu, Philippines',
    description: 'Design intuitive and user-friendly interfaces for our app.',
    applyLink: '/apply/ux-designer',
  },
];

export default function JobListingPage() {
  const [jobListings, setJobListings] = useState<any[]>([]);

  useEffect(() => {
    // Simulating an API call to fetch job listings. Replace with your actual API.
    setJobListings(sampleJobListings);
  }, []);

  return (
    <Page>
      <List>
        <DisplayData
          header="Job Listings"
          rows={jobListings.map((job, index) => ({
            title: job.title,
            value: (
              <div>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p>{job.description}</p>
                <a href={job.applyLink} style={{ color: '#007AFF' }}>Apply Now</a>
              </div>
            ),
          }))}
        />
      </List>
    </Page>
  );
}
