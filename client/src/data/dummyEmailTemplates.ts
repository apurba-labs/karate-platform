// src/data/dummyEmailTemplates.ts
import { EmailTemplate } from '../types/notification';

export const dummyEmailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to KarateConnect, {{firstName}}!',
    content: `
      <h1>Welcome to KarateConnect!</h1>
      <p>Dear {{firstName}},</p>
      <p>Thank you for joining our martial arts community. We're excited to have you on board!</p>
      <p>Get started by:</p>
      <ul>
        <li>Completing your profile</li>
        <li>Exploring upcoming tournaments</li>
        <li>Connecting with other martial artists</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,<br>The KarateConnect Team</p>
    `,
    variables: ['firstName', 'lastName'],
    category: 'SYSTEM',
    isActive: true,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-10-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Tournament Registration Confirmation',
    subject: 'Registration Confirmed: {{tournamentName}}',
    content: `
      <h1>Tournament Registration Confirmed</h1>
      <p>Dear {{firstName}},</p>
      <p>Your registration for <strong>{{tournamentName}}</strong> has been confirmed.</p>
      <p><strong>Event Details:</strong></p>
      <ul>
        <li>Date: {{tournamentDate}}</li>
        <li>Location: {{tournamentLocation}}</li>
        <li>Division: {{divisionName}}</li>
      </ul>
      <p>Please ensure your membership and licenses are up to date before the event.</p>
      <p>Good luck with your preparation!</p>
    `,
    variables: ['firstName', 'tournamentName', 'tournamentDate', 'tournamentLocation', 'divisionName'],
    category: 'TOURNAMENT',
    isActive: true,
    createdAt: '2023-02-20T00:00:00Z',
    updatedAt: '2023-09-15T00:00:00Z'
  },
  {
    id: 3,
    name: 'Match Schedule Notification',
    subject: 'Your Match Schedule: {{tournamentName}}',
    content: `
      <h1>Match Schedule Available</h1>
      <p>Hello {{firstName}},</p>
      <p>Your match schedule for <strong>{{tournamentName}}</strong> has been published.</p>
      <p><strong>First Match:</strong> {{firstMatchTime}} on {{firstMatchDate}}</p>
      <p>Please arrive at least 1 hour before your scheduled match time for check-in.</p>
      <p>View your complete schedule: <a href="{{scheduleLink}}">Tournament Schedule</a></p>
    `,
    variables: ['firstName', 'tournamentName', 'firstMatchTime', 'firstMatchDate', 'scheduleLink'],
    category: 'TOURNAMENT',
    isActive: true,
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2023-08-20T00:00:00Z'
  },
  {
    id: 4,
    name: 'Payment Reminder',
    subject: 'Reminder: Payment Due for {{tournamentName}}',
    content: `
      <h1>Payment Reminder</h1>
      <p>Dear {{firstName}},</p>
      <p>This is a friendly reminder that your payment for <strong>{{tournamentName}}</strong> is due on <strong>{{dueDate}}</strong>.</p>
      <p>Amount Due: {{amount}}</p>
      <p>Please complete your payment to secure your spot in the tournament.</p>
      <p><a href="{{paymentLink}}">Pay Now</a></p>
    `,
    variables: ['firstName', 'tournamentName', 'dueDate', 'amount', 'paymentLink'],
    category: 'REMINDER',
    isActive: true,
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-07-10T00:00:00Z'
  },
  {
    id: 5,
    name: 'Tournament Results',
    subject: 'Tournament Results: {{tournamentName}}',
    content: `
      <h1>Tournament Results</h1>
      <p>Congratulations on completing {{tournamentName}}!</p>
      <p>Your final placement: <strong>{{placement}}</strong> in {{divisionName}}</p>
      <p>View complete results and brackets: <a href="{{resultsLink}}">Tournament Results</a></p>
      <p>Thank you for participating!</p>
    `,
    variables: ['tournamentName', 'placement', 'divisionName', 'resultsLink'],
    category: 'TOURNAMENT',
    isActive: true,
    createdAt: '2023-05-12T00:00:00Z',
    updatedAt: '2023-06-18T00:00:00Z'
  }
];