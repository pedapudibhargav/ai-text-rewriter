
const BoardsTestData = {
    id: 1,
    organizerEmail: 'default@default.com',
    dateCreated: '2021-07-24T18:25:43.511Z',
    parcipants: [],
    viewers: [],
    boards: [
        {
            id: 1,
            name: 'Went Well',
            cards: [
                {
                    id: 1658672974668,
                    content: 'Scaling the application to handle a rapidly growing user base Ensuring data security and privacy in compliance with regulations Managing and resolving technical debt accumulated over time Implementing efficient and optimized algorithms for performance improvement Coordinating collaboration between cross-functional teams Dealing with legacy systems and integrating new technologies Maintaining high availability and minimizing downtime Managing project deadlines and deliverables Debugging and fixing complex software issues',
                    isVoteRequired: true,
                    votes: [
                        { voter: 'Rajinikanth', vote: '🤐' },
                        { voter: 'Vijay Sethupathi', vote: '👎' },
                        { voter: 'Ram Charan', vote: '👍' },
                        { voter: 'Mahesh Babu', vote: '🤔' },
                        { voter: 'Nani', vote: '👎' }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'To Improve',
            cards: [
                {
                    id: 1658672974669,
                    content: 'Maintaining high availability and minimizing downtime Managing project deadlines and deliverables Debugging and fixing complex software issues Balancing feature development with technical maintenance tasks',
                    isVoteRequired: true,
                    votes: [
                        { voter: 'Ajith', vote: '👍' },
                        { voter: 'Prabhas', vote: '🤔' },
                        { voter: 'Vikram', vote: '👍' }
                    ]
                },
                {
                    id: 1658672974669,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    isVoteRequired: true,
                    votes: [
                        { voter: 'Vijay', vote: '👍' },
                        { voter: 'Ravi Teja', vote: '🤔' },
                        { voter: 'Prabhas', vote: '👍' },
                        { voter: 'Vikram', vote: '👎' }
                    ]
                }
                // Additional cards...
            ]
        },
        {
            id: 3,
            name: 'Action Items',
            cards: [
                {
                    id: 1658672974670,
                    content: 'Lack of proper documentation and knowledge transfer from the previous team members',
                    isVoteRequired: true,
                    votes: [
                        { voter: 'Simbu', vote: '👎' },
                        { voter: 'Vijay', vote: '👍' },
                        { voter: 'Ravi Teja', vote: '🤔' },
                        { voter: 'Allu Arjun', vote: '👍' }
                    ]
                },
                // Additional cards...
            ]
        }
    ]
};
export default BoardsTestData;