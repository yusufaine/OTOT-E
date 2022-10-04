export type QuestionSummaryType = {
  acRate: number;
  difficulty: string;
  paidOnly: boolean;
  title: string;
  titleSlug: string;
  topicTags: { slug: string }[];
};

export const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

export const ALL_QUESTIONS_QUERY = JSON.stringify({
  query: `query psetQuestionList {
  psetQuestionList: questionList(
    categorySlug: ""
    limit: -1
    skip: 0
    filters: {}
  ) {
    questions: data {
    #   frontendQuestionId: questionFrontendId
      acRate
      difficulty
      paidOnly: isPaidOnly
      title
      titleSlug
      topicTags {
        slug
      }
    }
  }
}`,
  variables: {},
});
