// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import  Week  from './Week';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Week',
  component: Week,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Week>> = (args) => <Week {...args} />;

export const week1 = Template.bind({});
week1.args = {
  /*👇 The args you need here will depend on your component */
  firstDate: new Date(2021,5,14),
  dayInfo: [{
    /*👇 The args you need here will depend on your component */
    date: new Date(2021,5,17),
    availableTime: new Map([[8,new Date(2021,5,17,8)],[9,new Date(2021,5,17,9)]]),
    interviews: new Map([[10,{
    id: '001',
    inviteeId: 'a', // Represents inviter
    invitee: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviterId: 'b',
    inviter: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date(2021,5,17,10).toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
  [11,{
    id: '002',
    inviterId: 'a', // Represents inviter
    inviter: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviteeId: 'b',
    invitee: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
    [12, {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date(2021,5,17,12).toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    }]
  ]),
  },
  {
    /*👇 The args you need here will depend on your component */
    date: new Date(2021,5,17),
    availableTime: new Map([[8,new Date(2021,5,17,8)],[9,new Date(2021,5,17,9)]]),
    interviews: new Map([[10,{
    id: '001',
    inviteeId: 'a', // Represents inviter
    invitee: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviterId: 'b',
    inviter: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date(2021,5,17,10).toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
  [11,{
    id: '002',
    inviterId: 'a', // Represents inviter
    inviter: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviteeId: 'b',
    invitee: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
    [12, {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date(2021,5,17,12).toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    }]
  ]),
  },
  {
    /*👇 The args you need here will depend on your component */
    date: new Date(2021,5,17),
    availableTime: new Map([[8,new Date(2021,5,17,8)],[9,new Date(2021,5,17,9)]]),
    interviews: new Map([[10,{
    id: '001',
    inviteeId: 'a', // Represents inviter
    invitee: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviterId: 'b',
    inviter: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date(2021,5,17,10).toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
  [11,{
    id: '002',
    inviterId: 'a', // Represents inviter
    inviter: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviteeId: 'b',
    invitee: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
    [12, {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date(2021,5,17,12).toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    }]
  ]),
  },
  {
    /*👇 The args you need here will depend on your component */
    date: new Date(2021,5,17),
    availableTime: new Map([[8,new Date(2021,5,17,8)],[9,new Date(2021,5,17,9)]]),
    interviews: new Map([[10,{
    id: '001',
    inviteeId: 'a', // Represents inviter
    invitee: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviterId: 'b',
    inviter: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date(2021,5,17,10).toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
  [11,{
    id: '002',
    inviterId: 'a', // Represents inviter
    inviter: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviteeId: 'b',
    invitee: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
    [12, {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date(2021,5,17,12).toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    }]
  ]),
  },
  {
    /*👇 The args you need here will depend on your component */
    date: new Date(2021,5,17),
    availableTime: new Map([[8,new Date(2021,5,17,8)],[9,new Date(2021,5,17,9)]]),
    interviews: new Map([[10,{
    id: '001',
    inviteeId: 'a', // Represents inviter
    invitee: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviterId: 'b',
    inviter: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date(2021,5,17,10).toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
  [11,{
    id: '002',
    inviterId: 'a', // Represents inviter
    inviter: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviteeId: 'b',
    invitee: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
    [12, {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date(2021,5,17,12).toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    }]
  ]),
  },
  {
    /*👇 The args you need here will depend on your component */
    date: new Date(2021,5,17),
    availableTime: new Map([[8,new Date(2021,5,17,8)],[9,new Date(2021,5,17,9)]]),
    interviews: new Map([[10,{
    id: '001',
    inviteeId: 'a', // Represents inviter
    invitee: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviterId: 'b',
    inviter: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date(2021,5,17,10).toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
  [11,{
    id: '002',
    inviterId: 'a', // Represents inviter
    inviter: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviteeId: 'b',
    invitee: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
    [12, {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date(2021,5,17,12).toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    }]
  ]),
  },
  {
    /*👇 The args you need here will depend on your component */
    date: new Date(2021,5,17),
    availableTime: new Map([[8,new Date(2021,5,17,8)],[9,new Date(2021,5,17,9)]]),
    interviews: new Map([[10,{
    id: '001',
    inviteeId: 'a', // Represents inviter
    invitee: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviterId: 'b',
    inviter: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date(2021,5,17,10).toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
  [11,{
    id: '002',
    inviterId: 'a', // Represents inviter
    inviter: {
      id: 'a',
      name: 'Michael Jackson',
      timeZone: 'America/New York',
      email: 'xx@gmail.com'
    },
    inviteeId: 'b',
    invitee: {
      id: 'b',
      name: 'John Smith',
      timeZone: 'America/New York',
      email: 'yy@gmail.com'
    }, // Represents invitee
    startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
    status: 'INVITED',
  }],
    [12, {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date(2021,5,17,12).toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    }]
  ]),
  }
],

};

