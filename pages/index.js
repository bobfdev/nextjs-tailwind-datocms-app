import { gql, GraphQLClient } from 'graphql-request';
import CourseSection from '../components/CourseSection';

export default function Home({ course }) {
    console.log(course);
  return (
    <div>
      {course.courseDetail.map(section => <CourseSection key={section.id} details={section} />)}
    </div>
  )
}

const query = gql`
  query {
    course {
        id
        name
        slug
        courseDetail {
          ... on CourseHeaderRecord {
              __typename
              bigTitle
              smallTitle
              buttonText
              description
              id
          }
          ... on CalloutRecord {
              __typename
              bigTitle
              smallTitle
              description
              id
              image {
                url
                width
                height
              }
          }
          ... on LearnSectionRecord {
              __typename
              hoursOfContent
              numberOfLessons
              title
              id
              learningPoints {
                title
                id
              }
          }
          ... on PricingSectionRecord {
              __typename
              title
              id
              pricingCards {
                isFree
                priceInCents
                priceSuffix
                title
                id
                description
                finePrint
                featured
                buttonText 
              }
          }
        }
    }
  }
`

export async function getStaticProps () {
  const endpoint = "https://graphql.datocms.com";
  const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + process.env.DATOCMS_API_KEY,
      }
  });
  const course = await graphQLClient.request(query);
  console.log(course);
  return {
    props: course
  }
}