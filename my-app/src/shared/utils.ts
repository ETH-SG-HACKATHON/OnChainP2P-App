import { Listing } from "@/schema/createListing";
import { Transaction } from "@/schema/transaction";
import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const supabaseUrl = "https://uiyrtluvpkkgucnaljby.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeXJ0bHV2cGtrZ3VjbmFsamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzkyNjE4NSwiZXhwIjoyMDA5NTAyMTg1fQ.m-pMGHNl4htv_HN8J9NSWORohauRJ684_FrGKhXLjeg";
  console.log(supabaseKey);
  const supabase = createClient(
    supabaseUrl,
    supabaseKey ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeXJ0bHV2cGtrZ3VjbmFsamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzkyNjE4NSwiZXhwIjoyMDA5NTAyMTg1fQ.m-pMGHNl4htv_HN8J9NSWORohauRJ684_FrGKhXLjeg"
  );
  return supabase;
}

export async function insertListingToSupabase(listData: Listing) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("listing")
      .insert({
        wallet_address: listData.walletAddress,
        token: listData.token,
        amount: listData.amount,
        price: listData.price,
        duration: listData.duration,
        payment_method: listData.paymentMethod,
        name: listData.name,
        account_number: listData.accountNumber,
      })
      .select();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchNotification(id: string) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notification")
      .select()
      .eq("listing_id", id)
      .eq("status", "PENDING");
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getListingFromSupabase(address: string) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("listing")
      .select()
      .eq("wallet_address", address);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getListingFromSupabaseId(id: number) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("listing")
      .select()
      .eq("id", id);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllListingFromSupabase() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("listing").select();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function addImageToSupabase(image: any, id: string) {
  try {
    const supabase = getSupabase();
    console.log(image);
    const { data, error } = await supabase.storage
      .from("image")
      .upload(image.name, image);
    if (data) {
      console.log(data);
      AddImageToDb(data?.path, id);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function AddImageToDb(link: string, id: string) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("Transaction")
      .update({
        buyer_image_link: `https://uiyrtluvpkkgucnaljby.supabase.co/storage/v1/object/public/image/${link}`,
        status: "WAITING_SELLER",
      })
      .eq("listing_id", id);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function sendNotificationToSeller( //FIRST
  seller: string,
  buyer: string,
  listing_id: number
) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notification")
      .insert({
        seller_address: seller,
        buyer_address: buyer,
        status: "PENDING",
        listing_id: listing_id,
      })
      .select();
    console.log(data);
    const { data: data2, error: error2 } = await supabase
      .from("listing")
      .update({
        offers: [listing_id],
      })
      .eq("id", listing_id);
    console.log(data2);
  } catch (e) {
    console.log(e);
  }
}

export const acceptOffer = async (id: number) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notification")
      .update({
        status: "ACCEPTED",
      })
      .eq("listing_id", id);

    console.log("mydata", data);

    // const { data: data2, error: error2 } = await supabase
    //   .from("noification")
    //   .update({
    //     status: "REJECTED",
    //   })
    //   .eq("status", "PENDING");
  } catch (e) {
    console.log(e);
  }
};

export const rejectOffer = async (id: number) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notification")
      .update({
        status: "REJECTED",
      })
      .eq("id", id);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const fetchAcceptedOffers = async (address: string) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notification")
      .select()
      .eq("buyer_address", address)
      .eq("status", "ACCEPTED");
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchListingById = async (id: number) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("listing")
      .select()
      .eq("id", id);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const insertTransaction = async (dataTr: Transaction) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("Transaction")
      .insert({
        contract_address: dataTr.contractAddress,
        buyer_address: dataTr.buyerAddress,
        seller_address: dataTr.sellerAddress,
        status: "ONGOING",
      })
      .select();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export async function getTransactionFromSupabase(address: string) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("Transaction")
      .select()
      .eq("wallet_address", address);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function checkUserOrSeller(address: string) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("Transaction")
      .select()
      .eq("status", "ONGOING")
      .eq("buyer_address", address);
    console.log(data);
    if (!data || data.length < 0) {
      console.log("ini dapet nya 1");
      return 1;
    } else if (data) {
      console.log("ini dapet nya 2");
      return 2;
    } else {
      console.log("ini dapet nya 3");
      return 3;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function checkUserOrSeller2(address: string) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("Transaction")
      .select()
      .eq("status", "ONGOING")
      .eq("seller_address", address);
    console.log(data);
    return true;
  } catch (e) {
    console.log(e);
  }
}

export async function getNotificationFromSupabaseId(id: number) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("notification")
      .select()
      .eq("listing_id", id);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getTransactionFromSupabaseId(id: number) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("Transaction")
      .select()
      .eq("listing_id", id);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateTransactionStatus(id: number) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("Transaction")
      .update({
        status: "DEPOSITED",
      })
      .eq("id", id);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
