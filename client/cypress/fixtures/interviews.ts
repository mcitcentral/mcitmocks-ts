export default function handler() {
    return {
      interviewsAsInviter: [
          {
            id: '1',
            inviterId: 'a',
            inviteeId: 'b',
            startTime: new Date().toISOString(),
            status: 'CONFIRMED'
          },
      ],
      interviewsAsInvitee: [
          {
            id: '2',
            inviterId: 'a',
            inviteeId: 'c',
            startTime: new Date().toISOString(),
            status: 'CONFIRMED'
          }
      ]
    };
  }