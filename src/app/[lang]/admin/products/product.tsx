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
import { currency } from "@/lib/utils";
import { SelectProduct } from "@/db/schema";
import { EditProduct } from "./edit-product";
import { DeleteProduct } from "./delete-product";

export const Product = ({
  id,
  description,
  img,
  price,
  title,
  isRecommended,
}: SelectProduct) => {
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
        <CardDescription>{description}</CardDescription>
        <p>{currency.format(price)}</p>
      </CardHeader>
      <CardContent>
        {isRecommended && <div className="mb-4">Recomendado </div>}
        <div className="items flex justify-end space-x-4">
          <EditProduct
            id={id}
            title={title}
            description={description}
            price={price}
            img={img}
            isRecommended={isRecommended}
          />
          <DeleteProduct id={id} img={img} />
        </div>
      </CardContent>
    </Card>
  );
};
