"use server";

import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { formatCPF } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCPF: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const productsWithPrice = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  const productsWithPriceAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrice.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      customerName: input.customerName,
      customerCPF: formatCPF(input.customerCPF),
      status: "PENDING",
      orderProducts: {
        createMany: {
          data: productsWithPriceAndQuantities,
        },
      },
      total: productsWithPriceAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      restaurantId: restaurant.id,
    },
  });
  redirect(`/${input.slug}/orders`);
};
