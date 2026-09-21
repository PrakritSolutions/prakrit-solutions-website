export type CaseStudyComponent = {
  name: string;
  audience: string;
  description: string;
  highlights: string[];
  appStoreUrl?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  title: string;
  summary?: string;
  problem: string;
  approach: string;
  solution: string;
  scope?: string;
  components?: CaseStudyComponent[];
  technology: string[];
  outcome: string;
  placeholder?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bookcargo",
    client: "BookCargo",
    category: "Mobile Application",
    title: "Two native iOS apps for an on-demand goods transport platform",
    summary:
      "An unfinished Objective-C rewrite, rebuilt in SwiftUI as a customer app and a driver app on the App Store.",
    problem:
      "BookCargo is an on-demand service for moving goods, couriering parcels and shifting house. An Objective-C rewrite of its iOS app had been left partway through development and was never released. To move forward, it needed to become a modern, maintainable product with the payments and in-app chat the business required.",
    approach:
      "We rebuilt the apps in SwiftUI instead of patching the old Objective-C code, working against BookCargo's existing backend. Delivery ran in milestones, with TestFlight builds and rounds of client feedback, and the driver app was built as the second half of the same trip lifecycle.",
    solution:
      "Two apps that cover a trip from request to payment: a customer app for booking and tracking, and a driver app for accepting and completing trips. On top of the original scope we added in-app payments and real-time chat between customer and driver.",
    scope:
      "iOS development of both apps, the customer app and the driver app. The apps run against BookCargo's existing backend.",
    components: [
      {
        name: "BookCargo, the customer app",
        audience: "For people and businesses booking a vehicle",
        appStoreUrl:
          "https://apps.apple.com/in/app/bookcargo-to-transport-goods/id1532396613",
        description:
          "Book a vehicle to move goods, send a courier package or shift house in a few taps.",
        highlights: [
          "Fare estimates and scheduled bookings",
          "Real-time trip tracking and OTP-verified rides",
          "Wallet, coupons and multiple payment options",
          "In-app chat with the driver",
          "Saved favourite locations",
          "Invite-and-earn referrals",
        ],
      },
      {
        name: "BookCargo Pilot, the driver app",
        audience: "For registered BookCargo drivers",
        appStoreUrl:
          "https://apps.apple.com/in/app/bookcargo-pilot-for-drivers/id1532396673",
        description:
          "Receive bookings from nearby locations and run each trip without having to search for customers.",
        highlights: [
          "Driver onboarding with document verification",
          "Nearby booking requests with real-time updates",
          "In-app chat with the customer",
          "Earnings, weekly reports and trip summaries",
          "Bank account and cash-receipt handling",
          "Invite-and-earn referrals",
        ],
      },
    ],
    technology: [
      "Swift",
      "SwiftUI",
      "Google Maps & Places",
      "Firebase",
      "AWS Cognito & S3",
      "Cashfree",
      "Push notifications",
    ],
    outcome:
      "The half-finished Objective-C rewrite became two complete SwiftUI apps, with payments and chat added. Both are on the App Store as BookCargo and BookCargo Pilot.",
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
