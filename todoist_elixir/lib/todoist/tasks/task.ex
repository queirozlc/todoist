defmodule Todoist.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :title, :string
    field :status, Ecto.Enum, values: [completed: 1, uncompleted: 0]
    field :is_important, :boolean, default: false

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :is_important, :status])
    |> validate_required([:title, :is_important, :status])
    |> validate_inclusion(:status, [:completed, :uncompleted])
  end
end
