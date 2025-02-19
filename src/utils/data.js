export const questions = {
  questions: [
    {
      question_id: 1,
      question:
        "A CFA charterholder accepts a job with a new firm but does not disclose that they are part of an ongoing legal dispute with a former employer. Has the CFA charterholder violated the Standards?",
      option_a: "No",
      option_b: "Yes, by not disclosing the legal dispute",
      option_c: "Yes, because they accepted a new job",
      answer: "B",
      explanation:
        "Correct because according to the CFA Institute’s Standards of Professional Conduct, members must disclose potential conflicts of interest, including ongoing legal disputes with former employers.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 1,
      info_id: 1,
      subject: "Ethics",
      topic: "Conflict of Interest",
    },
    {
      question_id: 2,
      question:
        "A CFA member receives material nonpublic information about a company from a friend. What is the appropriate course of action?",
      option_a: "Trade on the information",
      option_b: "Disclose the information to a client",
      option_c: "Do not trade or disclose the information",
      answer: "C",
      explanation:
        "Correct because members must not act on material nonpublic information to maintain fairness and integrity in the market.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 2,
      info_id: 2,
      subject: "Ethics",
      topic: "Material Nonpublic Information",
    },
    {
      question_id: 3,
      question:
        "A portfolio manager allocates an IPO only to his family accounts, leaving out clients. Which Standard has been violated?",
      option_a: "Fair Dealing",
      option_b: "Conflicts of Interest",
      option_c: "Independence and Objectivity",
      answer: "A",
      explanation:
        "Correct because the portfolio manager must ensure that all clients are treated fairly in allocating investment opportunities.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 3,
      info_id: 3,
      subject: "Ethics",
      topic: "Fair Dealing",
    },
    {
      question_id: 4,
      question:
        "A CFA candidate misrepresents their level of experience on their resume. Which Standard is violated?",
      option_a: "Duties to Employers",
      option_b: "Misrepresentation",
      option_c: "Professionalism",
      answer: "B",
      explanation:
        "Correct because misrepresenting qualifications violates the CFA Standard regarding integrity and honest communication.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 4,
      info_id: 4,
      subject: "Ethics",
      topic: "Misrepresentation",
    },
    {
      question_id: 5,
      question:
        "If a CFA member manages both family and client accounts, they should prioritize:",
      option_a: "Family accounts",
      option_b: "Client accounts",
      option_c: "Accounts with the largest balance",
      answer: "B",
      explanation:
        "Correct because the duty of loyalty requires prioritizing client interests above all else.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 5,
      info_id: 5,
      subject: "Ethics",
      topic: "Duties to Clients",
    },
    {
      question_id: 6,
      question:
        "A member of the CFA Institute accidentally comes across nonpublic information while working on a new deal. What should they do?",
      option_a: "Report it to their supervisor",
      option_b: "Use the information for personal gain",
      option_c: "Refrain from acting on the information",
      answer: "C",
      explanation:
        "Correct because the member must not act on material nonpublic information, according to Standard II(A).",
      mock_id: 1,
      subject_id: 1,
      concept_id: 6,
      info_id: 6,
      subject: "Ethics",
      topic: "Material Nonpublic Information",
    },
    {
      question_id: 7,
      question:
        "Which of the following actions would most likely violate the Standard on Independence and Objectivity?",
      option_a: "Accepting a $50 gift from a long-term client",
      option_b:
        "Declining a gift because it could appear as a conflict of interest",
      option_c:
        "Accepting an all-expenses-paid trip from a company the member covers",
      answer: "C",
      explanation:
        "Correct because accepting significant compensation, like an all-expenses-paid trip, may compromise objectivity and violate the Standard.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 7,
      info_id: 7,
      subject: "Ethics",
      topic: "Independence and Objectivity",
    },
    {
      question_id: 8,
      question:
        "If a CFA member wishes to disclose confidential client information, they must:",
      option_a:
        "Always keep information confidential, regardless of circumstances",
      option_b: "Disclose information if required by law",
      option_c: "Share it with colleagues in their firm without client consent",
      answer: "B",
      explanation:
        "Correct because the CFA Standards allow disclosure of confidential information if legally required.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 8,
      info_id: 8,
      subject: "Ethics",
      topic: "Confidentiality",
    },
    {
      question_id: 9,
      question:
        "What is the appropriate action if a CFA charterholder encounters a situation where the law conflicts with the CFA Standards?",
      option_a: "Follow the stricter rule",
      option_b: "Follow the law",
      option_c: "Ignore the conflict",
      answer: "A",
      explanation:
        "Correct because the CFA Standards dictate that when laws and ethical standards conflict, members should adhere to the stricter of the two.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 9,
      info_id: 9,
      subject: "Ethics",
      topic: "Compliance with Laws",
    },
    {
      question_id: 10,
      question:
        "A CFA member takes on a part-time job as a consultant, which conflicts with their full-time position. What should they do first?",
      option_a: "Resign from their full-time position",
      option_b: "Disclose the conflict to their full-time employer",
      option_c: "Keep the consulting job private",
      answer: "B",
      explanation:
        "Correct because the Standards require members to fully disclose potential conflicts of interest to their employer.",
      mock_id: 1,
      subject_id: 1,
      concept_id: 10,
      info_id: 10,
      subject: "Ethics",
      topic: "Conflict of Interest",
    },
  ],
};

export const questionAttempts = {
  questionAttempts: [
    {
      id: 1,
      question_id: 1,
      attempt_id: 1,
      answer_given: "C",
      correct: true,
      analysis: "Good understanding of disclosure of conflicts of interest.",
      confidence: 0.9,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Conflict of Interest",
    },
    {
      id: 2,
      question_id: 2,
      attempt_id: 1,
      answer_given: "C",
      correct: true,
      analysis:
        "Properly identified the need to refrain from trading on nonpublic information.",
      confidence: 0.8,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Material Nonpublic Information",
    },
    {
      id: 3,
      question_id: 3,
      attempt_id: 1,
      answer_given: "A",
      correct: true,
      analysis: "Correctly recognized the violation of fair dealing.",
      confidence: 0.85,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Fair Dealing",
    },
    {
      id: 4,
      question_id: 4,
      attempt_id: 1,
      answer_given: "A",
      correct: true,
      analysis: "Accurately identified misrepresentation of qualifications.",
      confidence: 0.75,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Misrepresentation",
    },
    {
      id: 5,
      question_id: 5,
      attempt_id: 1,
      answer_given: "B",
      correct: true,
      analysis: "Correctly prioritized client accounts.",
      confidence: 0.95,
      marked_for_later: true,
      subject: "Ethics",
      topic: "Duties to Clients",
    },
    {
      id: 6,
      question_id: 6,
      attempt_id: 1,
      answer_given: "B",
      correct: true,
      analysis:
        "Understood the importance of not acting on nonpublic information.",
      confidence: 0.9,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Material Nonpublic Information",
    },
    {
      id: 7,
      question_id: 7,
      attempt_id: 1,
      answer_given: "C",
      correct: true,
      analysis:
        "Correctly identified the conflict of interest in accepting gifts.",
      confidence: 0.85,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Independence and Objectivity",
    },
    {
      id: 8,
      question_id: 8,
      attempt_id: 1,
      answer_given: "B",
      correct: true,
      analysis:
        "Recognized the conditions under which confidential information can be disclosed.",
      confidence: 0.9,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Confidentiality",
    },
    {
      id: 9,
      question_id: 9,
      attempt_id: 1,
      answer_given: "C",
      correct: true,
      analysis: "Correctly chose the stricter rule in case of conflict.",
      confidence: 0.95,
      marked_for_later: false,
      subject: "Ethics",
      topic: "Compliance with Laws",
    },
    {
      id: 10,
      question_id: 10,
      attempt_id: 1,
      answer_given: "B",
      correct: true,
      analysis:
        "Properly handled the conflict of interest between jobs by disclosing it to the employer.",
      confidence: 0.85,
      marked_for_later: true,
      subject: "Ethics",
      topic: "Conflict of Interest",
    },
  ],
};
