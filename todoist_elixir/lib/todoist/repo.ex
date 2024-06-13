defmodule Todoist.Repo do
  use Ecto.Repo,
    otp_app: :todoist,
    adapter: Ecto.Adapters.Postgres
end
