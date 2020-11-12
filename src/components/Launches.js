import React from "react";
import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query GetFiveLauches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      mission_name
      links {
        video_link
      }
      details
      id
      rocket {
        rocket_name
      }
    }
  }
`;

export default function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map(
    ({
      launch_date_utc,
      launch_success,
      links: { video_link },
      mission_name,
      id,
      rocket: { rocket_name },
      details,
    }) => (
      <div key={id} style={{ width: "50vw", border: "1px solid #c09f9f", padding: "10px"}}>
        <p>Mission name: {mission_name}</p>
        <p>Rocket name: {rocket_name}</p>
        <p>launch date: {launch_date_utc}</p>
        <p>success: {launch_success ? "success" : "fail"}</p>
        <p>video_link: {video_link}</p>
        details:{JSON.stringify(details, null, 2)}
      </div>
    )
  );
}
