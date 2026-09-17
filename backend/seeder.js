const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");
const User = require("./models/userModel");
const News = require("./models/newsModel");

// Load environment variables
dotenv.config();

// DNS fix for Windows SRV queries
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const sampleNews = [
  {
    title: "Next-Gen Quantum Computing Breakthrough Achieves Room-Temperature Stability",
    content:
      "Scientists and researchers have unveiled a ground-breaking milestone in quantum architecture, achieving coherent qubit stability at near-ambient room temperatures. This breakthrough eliminates the requirement for cryogenic sub-zero liquid helium cooling units, paving the way for practical commercial quantum computing applications in cybersecurity, climate modeling, and drug discovery over the next five years.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
    category: "Technology",
  },
  {
    title: "Global Tech Summit 2026: AI Agents Redefine Autonomous Software Development",
    content:
      "At this year's annual Global Tech Summit, industry leaders showcased next-generation AI developer agents capable of collaborative multi-agent code orchestration, automated security audits, and continuous cloud deployments with minimal human oversight. Keynote speakers emphasized that human developers are shifting into high-level strategic architect roles.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    category: "Technology",
  },
  {
    title: "Champions League Thriller: Dramatic Extra-Time Comeback Secures Final Spot",
    content:
      "In one of the most electrifying European football matches in recent memory, a breathtaking 94th-minute volley forced extra time before a clinical penalty shootout sealed a historic spot in the Champions League final. Over 75,000 fans witnessed an unforgettable display of tactical brilliance and resilience.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    category: "Sports",
  },
  {
    title: "Olympic Committee Announces Revolutionary Green Stadium Initiative",
    content:
      "The International Olympic Committee has approved a zero-carbon mandate for all future host cities. The guidelines require 100% renewable powered infrastructure, recycled construction materials, and integrated public transit networks designed to permanently reduce ecological footprints during world sporting events.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
    category: "Sports",
  },
  {
    title: "World Leaders Sign Historic Multi-Lateral Climate and Clean Energy Accord",
    content:
      "Delegates from over 140 nations concluded intensive diplomatic negotiations today, ratifying a binding agreement to accelerate transition financing for solar, wind, and next-generation battery storage systems in developing economies while phasing out fossil fuel subsidies by 2030.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    category: "Politics",
  },
  {
    title: "Global Stock Markets Surge as Central Banks Signal Balanced Economic Growth",
    content:
      "Major global indices rallied across Wall Street, Tokyo, and London following positive consumer spending figures and moderate inflation data. Financial analysts project sustained venture investments in renewable energy, semiconductors, and automated logistics networks throughout the fiscal year.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    category: "Business",
  },
  {
    title: "International Space Station Welcomes First Private Deep-Space Science Laboratory",
    content:
      "A commercial cargo spacecraft successfully docked with the ISS carrying an automated biological experimentation module. The mission will study cellular regeneration and crystal growth in microgravity to develop new treatments for neurodegenerative diseases on Earth.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    category: "Science",
  },
  {
    title: "Breakthrough Gene Therapy Trial Shows Promising Reversal of Vision Loss",
    content:
      "Clinical researchers at leading medical institutes have reported breakthrough results in early human trials of a targeted mRNA gene therapy. Over 85% of participating patients diagnosed with hereditary retinal degeneration experienced measurable visual recovery with zero severe adverse reactions.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    category: "Health",
  },
  {
    title: "International Film Festival Celebrates Independent Cinema and Digital Storytelling",
    content:
      "The prestigious festival kicked off this week featuring an unprecedented slate of independent films, interactive virtual reality documentaries, and cross-cultural narratives that explore human resilience, identity, and the modern digital age.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    category: "Entertainment",
  },
  {
    title: "Global Ocean Expedition Discovers Hundreds of Pristine Coral Reef Species",
    content:
      "A deep-sea robotic exploration voyage across the Pacific Ocean has mapped previously uncharted underwater seamounts, discovering thriving vibrant coral ecosystems and novel marine organisms that hold vital clues to ocean biodiversity conservation.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    category: "World",
  },
];

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully.");

    // Create or find an author user
    let author = await User.findOne({ email: "editor@newsportal.com" });
    if (!author) {
      author = await User.create({
        name: "Rayeen Rahman",
        email: "editor@newsportal.com",
        password: "password123",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        bio: "Senior Technology & World News Editor at NewsPortal.",
      });
      console.log("Created default editor account: editor@newsportal.com");
    }

    // Clear existing news and seed fresh articles
    await News.deleteMany({});
    console.log("Cleared existing news articles.");

    const newsWithAuthor = sampleNews.map((item) => ({
      ...item,
      author: author._id,
    }));

    await News.insertMany(newsWithAuthor);
    console.log(`Successfully seeded ${newsWithAuthor.length} articles!`);

    console.log("\nSample articles created across all categories:");
    sampleNews.forEach((n, i) => console.log(`  ${i + 1}. [${n.category}] ${n.title}`));

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
