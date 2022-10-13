const tasks = [
    {
        id: 1,
        name: "Task 1"
    },    
    {
        id: 2,
        name: "Task 2",
        parent: 1,
        from: "2022-10-21",
        to: "2022-10-25"
    },    
    {
        id: 3,
        name: "Task 3",
        parent: 1,
        from: "2022-10-25",
        to: "2022-10-31",
        type: {
            __typename: "BufferTaskType",
            buffer: 10
        },
        steps: [{
            from: "2022-10-27",
            to: "2022-10-28"
        }, {
            from: "2022-10-30",
            to: "2022-10-31"
        }]
    },    
]
 
export default tasks