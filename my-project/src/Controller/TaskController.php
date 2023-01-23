<?php

namespace App\Controller;

use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api/task')]
class TaskController extends AbstractController
{
    #[Route('/', name: 'app_task', methods: "GET")]
    public function getTasks(TaskRepository $repo): Response
    {
        $tasks = $repo->findAll();
        return $this->json( [
            'message' => 'Все задачи',
            'data' => $tasks,
        ]);
    }

    #[Route('/', name: 'create_task', methods: "POST")]
    public function createTask(Request $request, TaskRepository $repo): Response
    {
        if(is_null($request->request->get('content', null))) return $this ->json([
            'message' => 'пустая задача'
        ], 400);

        $task = new Task();
        $task -> setContent($request->request->get('content'));
        $task -> setIsDone();

        $repo->save($task,true);
        return $this->json( [
            'message' => 'Задача создана',
            'data' => $task,
        ]);
    }

    #[Route('/{id}', name: 'edit_task', methods: "PUT")]
    public function editTask($id, Request $request, TaskRepository $repo): Response
    {
        if(is_null($request->request->get('content', null))) return $this ->json([
            'message' => 'пустая задача'
        ], 400);

        $task = $repo->find($id);

        if(!$task instanceof Task) return $this->json([
            'message' => 'Задача не найдена'
        ], 404);

        $data = json_decode($request->getContent(),true);

        if (array_key_exists('content', $data) && $data['content']!== $task->getContent())
            $task->setContent($data('content'));
        if (array_key_exists('data', $data) && $data['data']!== $task->isDone())
            $task->setIsDone(false);


        $repo->save($task,true);

        return $this->json( [
            'message' => 'Задача отредактирована',
            'data' => $task,
        ]);
    }

    #[Route('/{id}', name: 'delete_task', methods: "PUT")]
    public function deleteTask($id,  TaskRepository $repo): Response
    {

        $task = $repo->find($id);

        if(!$task instanceof Task) (
            $repo->remove($task,true)
        );



        $repo->save($task,true);

        return $this->json( [
            'message' => 'Задача удалена',
        ]);
    }
}
