export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  title: string;
  problem: string;
  approach: string;
  solution: string;
  technology: string[];
  outcome: string;
  placeholder: true;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "project-one",
    client: "[Client Name]",
    category: "Mobile Application",
    title: "[Project Name]",
    problem:
      "[Placeholder: describe the business problem the client came to us with.]",
    approach:
      "[Placeholder: describe how we approached discovery, scoping and architecture.]",
    solution:
      "[Placeholder: describe what was built and the key product decisions made.]",
    technology: ["React Native", "Node.js", "PostgreSQL"],
    outcome:
      "[Placeholder: describe the measurable or qualitative outcome once real data is available.]",
    placeholder: true,
  },
  {
    slug: "project-two",
    client: "[Client Name]",
    category: "AI Solution",
    title: "[Project Name]",
    problem:
      "[Placeholder: describe the business problem the client came to us with.]",
    approach:
      "[Placeholder: describe how we approached discovery, scoping and architecture.]",
    solution:
      "[Placeholder: describe what was built and the key product decisions made.]",
    technology: ["Next.js", "OpenAI API", "Vector Database"],
    outcome:
      "[Placeholder: describe the measurable or qualitative outcome once real data is available.]",
    placeholder: true,
  },
  {
    slug: "project-three",
    client: "[Client Name]",
    category: "Business Automation",
    title: "[Project Name]",
    problem:
      "[Placeholder: describe the business problem the client came to us with.]",
    approach:
      "[Placeholder: describe how we approached discovery, scoping and architecture.]",
    solution:
      "[Placeholder: describe what was built and the key product decisions made.]",
    technology: ["Python", "n8n", "REST APIs"],
    outcome:
      "[Placeholder: describe the measurable or qualitative outcome once real data is available.]",
    placeholder: true,
  },
];
