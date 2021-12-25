import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to showed</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <div style={{ textAlign: "center" }}>
        <Pagination page={page} total={total} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate satrt page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();
  return {
    props: { events, page: +page, total },
  };
}