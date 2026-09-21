export type CaseStudyComponent = {
  name: string;
  audience: string;
  description: string;
  highlights: string[];
  storeLink?: { label: string; href: string };
};

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  status?: string;
  title: string;
  summary?: string;
  problem: string;
  approach: string;
  solution: string;
  scope?: string;
  componentsHeading?: string;
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
    componentsHeading: "Two apps, one trip.",
    components: [
      {
        name: "BookCargo, the customer app",
        audience: "For people and businesses booking a vehicle",
        storeLink: {
          label: "View on the App Store",
          href: "https://apps.apple.com/in/app/bookcargo-to-transport-goods/id1532396613",
        },
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
        storeLink: {
          label: "View on the App Store",
          href: "https://apps.apple.com/in/app/bookcargo-pilot-for-drivers/id1532396673",
        },
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
    slug: "dealerwerx",
    client: "Dealerwerx",
    category: "Mobile Application",
    status: "In development",
    title: "Ongoing development of a marketplace's iOS and Android apps",
    summary:
      "A maintenance engagement that grew into full-time development, keeping the native iOS and Android apps of a buy, sell and swap marketplace moving forward together.",
    problem:
      "Dealerwerx is a marketplace where people list, buy, sell and swap. It already had iOS and Android apps, and needed a team to keep them healthy: fixing issues and making small changes without slowing down the business.",
    approach:
      "We started with maintenance, working through bug fixes and small improvements, which gave us a deep understanding of both codebases. As the product's plans grew, the engagement became full-time development, with our team building new features on both platforms in step.",
    solution:
      "Continuous feature work and fixes across two native apps, so that iOS and Android stay consistent for buyers and sellers: listings and search, offers and purchase requests, memberships and payments, and in-app chat with moderation tools.",
    scope:
      "iOS and Android app development and maintenance. The backend and website are handled separately.",
    componentsHeading: "Two apps, one marketplace.",
    components: [
      {
        name: "Dealerwerx for iOS",
        audience: "For buyers and sellers on iPhone",
        description:
          "A native Swift app for creating and browsing listings and closing deals from the phone.",
        highlights: [
          "Create, edit and relist listings with photos",
          "Search, categories and a near-me map",
          "Offers, purchase requests and liked listings",
          "Swap and \"looking for\" listings",
          "Membership plans and in-app card payments",
          "In-app chat with block and report tools",
        ],
      },
      {
        name: "Dealerwerx for Android",
        audience: "For buyers and sellers on Android",
        description:
          "A native Android app that keeps pace with iOS, feature for feature.",
        highlights: [
          "Create, edit and relist listings with photos",
          "Search, categories and a near-me map",
          "Offers, purchase requests and liked listings",
          "Swap and \"looking for\" listings",
          "Membership plans, card payments and Google Pay",
          "In-app chat with archived conversations",
        ],
      },
    ],
    technology: [
      "Swift",
      "Java",
      "Firebase",
      "Google Maps & Places",
      "Square payments",
      "In-app subscriptions",
      "Push notifications",
    ],
    outcome:
      "This is an ongoing engagement. The new version is still in development and has not been released yet.",
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
