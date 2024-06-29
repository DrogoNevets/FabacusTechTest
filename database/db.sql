CREATE TABLE event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  seat_count INTEGER NOT NULL,
  CONSTRAINT seat_count_nonneg CHECK (seat_count >= 0)
);

CREATE TABLE booking (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id uuid NOT NULL,
	event_id uuid REFERENCES event(id),
	seat_count INTEGER NOT NULL,
	CONSTRAINT seat_count_nonneg CHECK (seat_count >= 0)
);