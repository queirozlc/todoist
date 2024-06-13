defmodule Todoist.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :is_important, :boolean, default: false, null: false
      add :status, :integer, null: false

      timestamps(type: :utc_datetime)
    end

    create index(:tasks, [:title])
    create index(:tasks, [:status])
  end
end
