"use client"

import { Section } from "@/components/section"
import { Heading } from "@/components/heading"
import DomeGallery from "@/components/dome-gallery"

export function Gallery() {
  const galleryImages = [
    { src: "/CoupleImage/couple_1.png", alt: "Casslyn and Mark sharing a tender moment together" },
    { src: "/CoupleImage/couple_2.png", alt: "Intimate couple portrait capturing their connection" },
    { src: "/CoupleImage/couple_3.png", alt: "Joyful moment of Casslyn and Mark laughing together" },
    { src: "/CoupleImage/couple_4.png", alt: "Romantic couple photo with beautiful natural lighting" },
    { src: "/CoupleImage/couple_5.png", alt: "Sweet embrace between Casslyn and Mark" },
    { src: "/CoupleImage/couple_6.png", alt: "Golden hour portrait of the couple together" },
    { src: "/CoupleImage/couple_7.png", alt: "Candid moment of Casslyn and Mark enjoying each other's company" },
    { src: "/CoupleImage/couple_8.png", alt: "Adorable couple photo showing their happiness" },
    { src: "/CoupleImage/couple_9.png", alt: "Tender moment between Casslyn and Mark" },
    { src: "/CoupleImage/couple_10.png", alt: "Loving couple portrait with warm smiles" },
    { src: "/CoupleImage/couple_11.png", alt: "Romantic couple moment captured beautifully" },
    { src: "/CoupleImage/couple_12.png", alt: "Beautiful photo of Casslyn and Mark together" },
    { src: "/CoupleImage/couple_13.png", alt: "Heartfelt moment from Casslyn and Mark's journey" },
    { src: "/CoupleImage/couple_14.png", alt: "Sweet couple photo filled with love and joy" },
    { src: "/CoupleImage/couple_15.png", alt: "Cherished memory of Casslyn and Mark together" },
  ]

  return (
    <Section id="gallery" bgColor="white">
      <Heading level="h2">Gallery</Heading>
      <p className="text-center text-foreground/70 mb-8 max-w-2xl mx-auto">
        Welcome to our little corner of happiness—a collection of stolen moments, spontaneous adventures, and quiet togetherness. 
        These photos capture the magic of ordinary days made extraordinary by love. From cozy coffee dates to sunset strolls, 
        each image holds a piece of our story, a memory of laughter shared and dreams whispered. 
        These aren't just pictures; they're fragments of our beautiful journey, frozen in time. 
        Drag to explore our world, click to step into each cherished memory.
      </p>

      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <DomeGallery
          images={galleryImages}
          fit={0.6}
          minRadius={400}
          maxRadius={800}
          overlayBlurColor="#f5f1ed"
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
          grayscale={false}
          dragSensitivity={25}
          enlargeTransitionMs={400}
        />
      </div>
    </Section>
  )
}
