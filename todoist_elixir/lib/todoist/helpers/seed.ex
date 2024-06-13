defmodule Todoist.Helpers.Seed do
  alias Todoist.Repo
  alias Todoist.Tasks.Task

  def run() do
    reset_db()
    seed_tasks!()
  end

  def seed_tasks!() do
    tasks = [
      %Task{
        title: "Buy milk",
        is_important: true,
        status: :uncompleted
      },
      %Task{
        title: "Buy eggs",
        is_important: true,
        status: :uncompleted
      },
      %Task{
        title: "Buy bread",
        is_important: false,
        status: :uncompleted
      },
      %Task{
        title: "Buy butter",
        is_important: false,
        status: :uncompleted
      },
      %Task{
        title: "Send email to John",
        is_important: false,
        status: :uncompleted
      },
      %Task{
        title: "Learn Elixir",
        is_important: false,
        status: :uncompleted
      },
      %Task{
        title: "Update the README.md file",
        is_important: false,
        status: :uncompleted
      }
    ]

    Enum.each(tasks, &Repo.insert!(&1))
  end

  defp reset_db() do
    Repo.delete_all(Task)
  end
end
