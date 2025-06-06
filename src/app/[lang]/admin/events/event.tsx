"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { SelectEvent } from "@/db/schema";
import { EditEvent } from "./edit-event";
import { DeleteEvent } from "./delete-event";
import { getParsedDate } from "@/lib/utils";

export const Event = ({ id, description, img, date, title }: SelectEvent) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden" key={id}>
      <div className="relative aspect-video w-full">
        <CldImage
          key={id}
          alt={title}
          className="object-cover"
          src={img}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{getParsedDate(date)}</CardDescription>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="items flex justify-end space-x-4">
          <EditEvent
            id={id}
            title={title}
            description={description}
            date={date}
            img={img}
          />
          <DeleteEvent id={id} img={img} />
        </div>
      </CardContent>
    </Card>
  );
};
