import React, { useState } from "react";

import first from "../assets/images/first.jpg";
import second from "../assets/images/second.jpg";
import third from "../assets/images/third.jpg";
import fourth from "../assets/images/fourth.jpg";
import fifth from "../assets/images/fifth.jpg";
import sixth from "../assets/images/sixth.png";
import DataItem from "./DataItem";
const Placeholder = [
  {
    id: "1",
    image: first,
    category: "education",
    title: "This is the first post",
    description:
      "The first mobile phone, introduced by Motorola in 1973, marked the beginning of the mobile communication revolution. Known as the Motorola DynaTAC 8000X, it was a groundbreaking device despite its bulky, brick-like design and considerable weight of about 1.1 kg. With limited functionality, this first phone primarily allowed users to make calls, and it offered just 30 minutes of talk time with a 10-hour recharge requirement. The device was a luxury item, retailing at nearly $4,000, affordable only to a select few. Yet, it was revolutionary, symbolizing freedom from the confines of landline telephones and sparking the journey to today’s ultra-thin, multi-functional smartphones. Over the years, mobile technology advanced rapidly, transforming the initial concept into pocket-sized devices that serve as powerful tools for communication, productivity, and entertainment. The first phone paved the way, laying the foundation for the mobile-dependent society we live in today.",
    user: "3",
  },
  {
    id: "2",
    image: second,
    category: "agriculture",
    title: "This is the second post",
    description:
      "The first mobile phone, introduced by Motorola in 1973, marked the beginning of the mobile communication revolution. Known as the Motorola DynaTAC 8000X, it was a groundbreaking device despite its bulky, brick-like design and considerable weight of about 1.1 kg. With limited functionality, this first phone primarily allowed users to make calls, and it offered just 30 minutes of talk time with a 10-hour recharge requirement. The device was a luxury item, retailing at nearly $4,000, affordable only to a select few. Yet, it was revolutionary, symbolizing freedom from the confines of landline telephones and sparking the journey to today’s ultra-thin, multi-functional smartphones. Over the years, mobile technology advanced rapidly, transforming the initial concept into pocket-sized devices that serve as powerful tools for communication, productivity, and entertainment. The first phone paved the way, laying the foundation for the mobile-dependent society we live in today.",
    user: "1",
  },
  {
    id: "3",
    image: third,
    category: "technology",
    title: "This is the third post",
    description:
      "The first mobile phone, introduced by Motorola in 1973, marked the beginning of the mobile communication revolution. Known as the Motorola DynaTAC 8000X, it was a groundbreaking device despite its bulky, brick-like design and considerable weight of about 1.1 kg. With limited functionality, this first phone primarily allowed users to make calls, and it offered just 30 minutes of talk time with a 10-hour recharge requirement. The device was a luxury item, retailing at nearly $4,000, affordable only to a select few. Yet, it was revolutionary, symbolizing freedom from the confines of landline telephones and sparking the journey to today’s ultra-thin, multi-functional smartphones. Over the years, mobile technology advanced rapidly, transforming the initial concept into pocket-sized devices that serve as powerful tools for communication, productivity, and entertainment. The first phone paved the way, laying the foundation for the mobile-dependent society we live in today.",
    user: "6",
  },
  {
    id: "4",
    image: fourth,
    category: "romance",
    title: "This is the fourth post",
    description:
      "The first mobile phone, introduced by Motorola in 1973, marked the beginning of the mobile communication revolution. Known as the Motorola DynaTAC 8000X, it was a groundbreaking device despite its bulky, brick-like design and considerable weight of about 1.1 kg. With limited functionality, this first phone primarily allowed users to make calls, and it offered just 30 minutes of talk time with a 10-hour recharge requirement. The device was a luxury item, retailing at nearly $4,000, affordable only to a select few. Yet, it was revolutionary, symbolizing freedom from the confines of landline telephones and sparking the journey to today’s ultra-thin, multi-functional smartphones. Over the years, mobile technology advanced rapidly, transforming the initial concept into pocket-sized devices that serve as powerful tools for communication, productivity, and entertainment. The first phone paved the way, laying the foundation for the mobile-dependent society we live in today.",
    user: "2",
  },
  {
    id: "5",
    image: fifth,
    category: "finance",
    title: "This is the fifth post",
    description:
      "The first mobile phone, introduced by Motorola in 1973, marked the beginning of the mobile communication revolution. Known as the Motorola DynaTAC 8000X, it was a groundbreaking device despite its bulky, brick-like design and considerable weight of about 1.1 kg. With limited functionality, this first phone primarily allowed users to make calls, and it offered just 30 minutes of talk time with a 10-hour recharge requirement. The device was a luxury item, retailing at nearly $4,000, affordable only to a select few. Yet, it was revolutionary, symbolizing freedom from the confines of landline telephones and sparking the journey to today’s ultra-thin, multi-functional smartphones. Over the years, mobile technology advanced rapidly, transforming the initial concept into pocket-sized devices that serve as powerful tools for communication, productivity, and entertainment. The first phone paved the way, laying the foundation for the mobile-dependent society we live in today.",
    user: "4",
  },
  {
    id: "6",
    image: sixth,
    category: "health",
    title: "This is the sixth post",
    description:
      "The first mobile phone, introduced by Motorola in 1973, marked the beginning of the mobile communication revolution. Known as the Motorola DynaTAC 8000X, it was a groundbreaking device despite its bulky, brick-like design and considerable weight of about 1.1 kg. With limited functionality, this first phone primarily allowed users to make calls, and it offered just 30 minutes of talk time with a 10-hour recharge requirement. The device was a luxury item, retailing at nearly $4,000, affordable only to a select few. Yet, it was revolutionary, symbolizing freedom from the confines of landline telephones and sparking the journey to today’s ultra-thin, multi-functional smartphones. Over the years, mobile technology advanced rapidly, transforming the initial concept into pocket-sized devices that serve as powerful tools for communication, productivity, and entertainment. The first phone paved the way, laying the foundation for the mobile-dependent society we live in today.",
    user: "5",
  }
];

const Data = () => {

    const [postData, setPostData] = useState(Placeholder);

  return (
    <section className="posts">
      <div className="container postsContainer">
      {
        postData.map(({id, image, category, title, description, user}) => 
        <DataItem key={id} image={image} category={category} title={title} description={description} user={user} />)
      }
      </div>
    </section>
  )
}

export default Data;

