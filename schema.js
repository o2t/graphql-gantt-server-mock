const typeDefs = `#graphql
type Query {
  tasks: [Task]
  links: [TaskLink]
}

type Task {
  id: ID!
  name: String
  parent: ID
  steps: [TaskStep!]
  from: DateTime
  to: DateTime
  freeFloat: Duration
  totalFloat: Duration
  initialDelay: Duration
  type: TaskType
}

type TaskStep {
  from: DateTime
  to: DateTime
}

union TaskType = HammockTaskType | BufferTaskType

type HammockTaskType {
  dummy: String
}

type BufferTaskType {
  buffer: Duration
}

type TaskLink {
  predecessor: ID!
  successor: ID!
  leadLag: Duration
  type: TaskLinkType
}

enum TaskLinkType {
  START_START,
  START_FINISH,
  FINISH_START,
  FINISH_FINISH
}

scalar DateTime

scalar Duration

`

export default typeDefs