"use client";

import {
  createModule,
  createModuleFile,
  createModuleQuestion,
  createModuleQuestionChoice,
  createModuleVideo,
  deleteModuleFile,
  deleteModuleQuestion,
  deleteModuleVideo,
  SelectRemoteCourseQuery,
} from "@/_actions/actions";
import { Submit } from "@/components/submit";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, File, Plus, Trash, Video } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CreateModuleQuestion = ({
  remoteModuleId,
}: {
  remoteModuleId: number;
}) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await createModuleQuestion(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-start">
          <Plus />
          Añadir pregunta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea una nueva pregunta</DialogTitle>
          <DialogDescription>
            Elegi un pregunta a tu preferencia
          </DialogDescription>
        </DialogHeader>

        <form
          action={handleAction}
          className="align-start mb-6 grid gap-6 sm:mb-10 md:mb-16"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="question">Pregunta</Label>
            <Input
              id="question"
              name="question"
              placeholder="Escribe la pregunta ..."
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="answer">Respuesta</Label>
            <Input
              id="answer"
              name="answer"
              placeholder="Escribe la respuesta ..."
              required
            />
          </div>

          <input type="hidden" name="remoteModuleId" value={remoteModuleId} />

          <div>
            <Submit text="Crear" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CreateModuleChoice = ({
  moduleQuestionId,
}: {
  moduleQuestionId: number;
}) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await createModuleQuestionChoice(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-2 self-start">
          <Plus />
          Añadir respuesta incorrecta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea una nueva respuesta incorrecta</DialogTitle>
          <DialogDescription>
            Elegi una respuesta incorrecta a tu preferencia
          </DialogDescription>
        </DialogHeader>

        <form
          action={handleAction}
          className="align-start mb-6 grid gap-6 sm:mb-10 md:mb-16"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="choice">Respuesta incorrecta</Label>
            <Input
              id="choice"
              name="choice"
              placeholder="Escribe la pregunta ..."
              required
            />
          </div>

          <input
            type="hidden"
            name="moduleQuestionId"
            value={moduleQuestionId}
          />

          <div>
            <Submit text="Crear" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FileItem = ({
  title,
  file,
  id,
  url,
}: {
  title: string;
  file: string;
  id: number;
  url: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await deleteModuleFile(formData);
    setOpen(false);
  };
  return (
    <>
      <div className="flex items-center">
        <File className="mr-2" />
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild variant={"outline"} size={"icon"}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Eye>
              <title>Vista previa</title>
            </Eye>
          </a>
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size={"icon"}>
              <Trash>
                <title>Borrar</title>
              </Trash>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas totalmente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no puede ser desecha. Al aceptar borraras el evento
                de forma permanente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>

              <form action={handleAction} className="grid place-items-center">
                <input type="hidden" name="fileId" value={file} />
                <input type="hidden" name="id" value={id} />
                <Submit text="Borrar" variant={"destructive"} />
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

const DeleteQuestion = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await deleteModuleQuestion(formData);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="mt-2">
          Borrar pregunta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas totalmente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser desecha. Al aceptar borraras la pregunta de
            forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <form action={handleAction} className="grid place-items-center">
            <input type="hidden" name="id" value={id} />
            <Submit text="Borrar" variant={"destructive"} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const VideoItem = ({
  title,
  url,
  id,
}: {
  title: string;
  url: string;
  id: number;
}) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await deleteModuleVideo(formData);
    setOpen(false);
  };
  return (
    <>
      <div className="flex items-center">
        <Video className="mr-2" />
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild variant={"outline"} size={"icon"}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Eye>
              <title>Vista previa</title>
            </Eye>
          </a>
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size={"icon"}>
              <Trash>
                <title>Borrar</title>
              </Trash>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas totalmente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no puede ser desecha. Al aceptar borraras el evento
                de forma permanente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>

              <form action={handleAction} className="grid place-items-center">
                <input type="hidden" name="id" value={id} />
                <Submit text="Borrar" variant={"destructive"} />
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

const CreateModuleFile = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await createModuleFile(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-start">
          <Plus />
          Añadir archivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea un nuevo archivo</DialogTitle>
          <DialogDescription>
            Elegi un titulo a tu preferencia
          </DialogDescription>
        </DialogHeader>

        <form
          action={handleAction}
          className="align-start mb-6 grid gap-6 sm:mb-10 md:mb-16"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              name="title"
              placeholder="Nombre del archivo ..."
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="file">Archivo</Label>
            <Input id="file" type="file" name="file" required />
          </div>
          <input type="hidden" name="remoteModuleId" value={id} />

          <div>
            <Submit text="Crear" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CreateModuleVideo = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await createModuleVideo(formData);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-start">
          <Plus />
          Añadir Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea un nuevo video</DialogTitle>
          <DialogDescription>
            Elegi un titulo a tu preferencia
          </DialogDescription>
        </DialogHeader>

        <form
          action={handleAction}
          className="align-start mb-6 grid gap-6 sm:mb-10 md:mb-16"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              name="title"
              placeholder="Nombre del archivo ..."
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="url">URL de video</Label>
            <Input id="url" type="text" name="url" required />
          </div>
          <input type="hidden" name="remoteModuleId" value={id} />

          <div>
            <Submit text="Crear" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const RemoteModule = ({
  files,
  id: moduleId,
  videos,
  title,
  questions,
}: SelectRemoteCourseQuery[number]["modules"][number]) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <ul>
            {files.map(({ title, id, file, url }) => (
              <li key={id} className="mb-3 flex justify-between">
                <FileItem file={file} id={id} title={title} url={url} />
              </li>
            ))}
          </ul>
          <ul>
            {videos.map(({ title, id, url }) => (
              <li key={id} className="mb-3 flex justify-between">
                <VideoItem url={url} id={id} title={title} />
              </li>
            ))}
          </ul>
          <ul>
            {questions.map(({ question, answer, items, id }) => (
              <li key={id} className="mb-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent>
                      <CreateModuleChoice moduleQuestionId={id} />
                      <ul className="flex items-center gap-x-4 text-lg font-bold">
                        <li className="text-green-600">{answer}</li>
                        {items.map(({ choice, id }) => (
                          <li className="text-red-600" key={id}>
                            {choice}
                          </li>
                        ))}
                      </ul>
                      <DeleteQuestion id={id} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <CreateModuleFile id={moduleId} />
            <CreateModuleVideo id={moduleId} />
            <CreateModuleQuestion remoteModuleId={moduleId} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const CreateModule = ({
  remoteCourseId,
}: {
  remoteCourseId: number;
}) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await createModule(formData);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 self-start">
          <Plus />
          Añadir modulo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea un nuevo modulo</DialogTitle>
          <DialogDescription>
            Elegi un titulo a tu preferencia
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction} className="align-start grid gap-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Titulo</Label>
            <Input id="title" name="title" placeholder="Modulo ..." required />
          </div>
          <input type="hidden" name="remoteCourseId" value={remoteCourseId} />

          <div>
            <Submit text="Crear" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
