"""Daily aggregation service.

Computes daily_summaries from raw screen_time_events for fast
dashboard queries. Runs periodically and on-demand.
"""


class AggregationService:
    """Aggregates screen time data into daily summaries."""

    def aggregate_date(self, target_date: str):
        """Compute or update the daily summary for a specific date.

        Args:
            target_date: Date string in YYYY-MM-DD format.
        """
        # TODO: Query screen_time_events for the date
        # TODO: Group by app_id, sum durations, count sessions
        # TODO: Upsert into daily_summaries
        pass

    def aggregate_today(self):
        """Recompute today's summary (called periodically)."""
        # TODO: Call aggregate_date with today's date
        pass

    def backfill(self, days: int = 7):
        """Recompute summaries for the last N days."""
        # TODO: Loop over dates and call aggregate_date
        pass
