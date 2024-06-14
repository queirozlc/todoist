defmodule Todoist.TasksFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Todoist.Tasks` context.
  """

  @doc """
  Generate a task.
  """
  def task_fixture(attrs \\ %{}) do
    {:ok, task} =
      attrs
      |> Enum.into(%{
        is_important: true,
        status: :uncompleted,
        title: "some title"
      })
      |> Todoist.Tasks.create_task()

    task
  end
end
