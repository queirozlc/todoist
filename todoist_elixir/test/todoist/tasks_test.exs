defmodule Todoist.TasksTest do
  use Todoist.DataCase, async: true

  alias Todoist.Tasks

  describe "tasks" do
    alias Todoist.Tasks.Task

    import Todoist.TasksFixtures

    @invalid_attrs %{status: nil, title: nil, is_important: nil}

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Tasks.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tasks.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      valid_attrs = %{status: :uncompleted, title: "some title", is_important: true}

      assert {:ok, %Task{} = task} = Tasks.create_task(valid_attrs)
      assert task.status == :uncompleted
      assert task.title == "some title"
      assert task.is_important == true
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()

      update_attrs = %{
        status: :completed,
        title: "some updated title",
        is_important: false
      }

      assert {:ok, %Task{} = task} = Tasks.update_task(task, update_attrs)
      assert task.status == :completed
      assert task.title == "some updated title"
      assert task.is_important == false
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_task(task, @invalid_attrs)
      assert task == Tasks.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tasks.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tasks.change_task(task)
    end
  end
end
