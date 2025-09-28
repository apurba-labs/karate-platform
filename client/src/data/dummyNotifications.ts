// src/data/dummyNotifications.ts
import { Notification } from '../types/notification';

export const dummyNotifications: Notification[] = [
  {
    id: 1,
    userId: 1,
    type: 'TOURNAMENT',
    title: 'Tournament Registration Open',
    message: 'Registration for Spring Karate Championship is now open. Click to register.',
    isRead: false,
    createdAt: '2023-10-15T10:30:00Z',
    relatedId: 101,
    actionUrl: '/tournaments/101/register',
    priority: 'HIGH'
  },
  {
    id: 2,
    userId: 1,
    type: 'SYSTEM',
    title: 'Welcome to KarateConnect!',
    message: 'Thank you for joining KarateConnect. Complete your profile to get started.',
    isRead: true,
    createdAt: '2023-10-14T09:15:00Z',
    actionUrl: '/profile/edit',
    priority: 'MEDIUM'
  },
  {
    id: 3,
    userId: 1,
    type: 'MESSAGE',
    title: 'New Message from Coach Tanaka',
    message: 'You have a new message regarding your upcoming training session.',
    isRead: false,
    createdAt: '2023-10-15T14:20:00Z',
    relatedId: 201,
    actionUrl: '/messages/201',
    priority: 'MEDIUM'
  },
  {
    id: 4,
    userId: 1,
    type: 'TOURNAMENT',
    title: 'Match Schedule Updated',
    message: 'Your match schedule for Regional Tournament has been updated. Check the new times.',
    isRead: false,
    createdAt: '2023-10-16T08:45:00Z',
    relatedId: 102,
    actionUrl: '/tournaments/102/schedule',
    priority: 'HIGH'
  },
  {
    id: 5,
    userId: 1,
    type: 'REMINDER',
    title: 'Payment Due Tomorrow',
    message: 'Reminder: Tournament registration fee payment is due tomorrow.',
    isRead: false,
    createdAt: '2023-10-16T16:30:00Z',
    relatedId: 101,
    actionUrl: '/payments',
    priority: 'URGENT'
  },
  {
    id: 6,
    userId: 1,
    type: 'ANNOUNCEMENT',
    title: 'New Features Available',
    message: 'We\'ve added new tournament management features. Check them out!',
    isRead: true,
    createdAt: '2023-10-13T11:00:00Z',
    actionUrl: '/help/new-features',
    priority: 'LOW'
  },
  {
    id: 7,
    userId: 1,
    type: 'TOURNAMENT',
    title: 'Brackets Published',
    message: 'The brackets for Winter Kumite Cup have been published. View your matches.',
    isRead: false,
    createdAt: '2023-10-17T09:30:00Z',
    relatedId: 103,
    actionUrl: '/tournaments/103/brackets',
    priority: 'HIGH'
  }
];