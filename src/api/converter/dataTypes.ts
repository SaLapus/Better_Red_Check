// Redactors types

interface RedactorLastUpdate {
  nickname: string;

  key: string;

  project_title: string;
  volume_title: string;
  activityName: "Редактура" | "Вычитка";
  date: number;
}

interface RedactorProjects {
  nickname: string;

  projects: Project<Volume[]>;
}

// Project types

type ProjectLastUpdate = Project<Volume>;

type ProjectInfo = Project<Volume[]>;

export type {
  RedactorLastUpdate as RedactorLastUpdates,
  RedactorProjects,
  ProjectLastUpdate,
  ProjectInfo,
};

interface Project<Type> {
  title: string;

  volumes: Type;
}

interface Volume {
  title: string;
  activityName: "Редактура" | "Вычитка";
  translators: string[];
  date: number;
  url: string;
  chapters: {
    title: string;
    date: number;
  };
}
